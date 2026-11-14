import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { ref, get, update } from 'firebase/database'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { auth, db } from '../Firebase/firebase'
import { useAuth } from '../contexts/AuthContextMemoria'
import '../css/perfil.css'

// Formata o telefone enquanto o usuário digita: (11) 1234-5678 ou (11) 91234-5678
function formatarTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, '').slice(0, 11)
  if (digitos.length === 0) return ''
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

// Telefone válido = DDD + 8 dígitos (fixo) ou DDD + 9 dígitos (celular)
function telefoneValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '')
  return digitos.length === 10 || digitos.length === 11
}

// Formata o CPF enquanto o usuário digita: 000.000.000-00
function formatarCpf(valor: string): string {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

// Valida o CPF pelos dígitos verificadores (rejeita também 000.000.000-00, 111.111.111-11 etc.)
function cpfValido(valor: string): boolean {
  const d = valor.replace(/\D/g, '')
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false

  const calcularDigito = (base: string) => {
    let soma = 0
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  return calcularDigito(d.slice(0, 9)) === Number(d[9]) && calcularDigito(d.slice(0, 10)) === Number(d[10])
}

export default function Perfil() {
  const { usuario, logout, login } = useAuth()
  const navigate = useNavigate()

  const [nome, setNome] = useState(usuario?.nome || '')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  // Depois que o CPF está salvo no banco, ele fica travado (só leitura)
  const [cpfSalvo, setCpfSalvo] = useState(false)
  // Campos que não existem em usuarios/{uid}/dados (ex: ['CPF', 'Telefone'])
  const [faltando, setFaltando] = useState<string[]>([])
  const [salvandoNome, setSalvandoNome] = useState(false)
  const [msgNome, setMsgNome] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)

  const [enviandoReset, setEnviandoReset] = useState(false)
  const [msgSenha, setMsgSenha] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null)

  // Ao abrir o perfil, busca os dados do usuário no Realtime Database (usuarios/{uid}/dados)
  // e verifica quais informações estão faltando.
  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const caminho = `usuarios/${user.uid}/dados`

    get(ref(db, caminho))
      .then((snapshot) => {
        const dados = snapshot.val() || {}

        if (dados.nome && !user.displayName) setNome(String(dados.nome))
        if (dados.telefone) setTelefone(formatarTelefone(String(dados.telefone)))
        if (dados.cpf) {
          setCpf(formatarCpf(String(dados.cpf)))
          setCpfSalvo(true)
        }

        // E-mail faltando: preenche automaticamente com o e-mail do login (não precisa do usuário)
        if (!dados.email && user.email) {
          update(ref(db, caminho), { email: user.email }).catch((err) =>
            console.error('[perfil] erro ao preencher e-mail:', err),
          )
        }

        const lista: string[] = []
        if (!dados.nome) lista.push('Nome')
        if (!dados.cpf) lista.push('CPF')
        if (!dados.telefone) lista.push('Telefone')
        setFaltando(lista)
      })
      .catch((err) => console.error('[perfil] erro ao carregar dados:', err))
  }, [])

  async function handleSalvarNome(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) {
      setMsgNome({ tipo: 'erro', texto: 'Por favor, informe seu nome.' })
      return
    }
    if (!cpfSalvo && !cpfValido(cpf)) {
      setMsgNome({ tipo: 'erro', texto: 'Informe um CPF válido.' })
      return
    }
    if (!telefoneValido(telefone)) {
      setMsgNome({ tipo: 'erro', texto: 'Informe um telefone válido com DDD, ex: (11) 91234-5678.' })
      return
    }

    setSalvandoNome(true)
    setMsgNome(null)

    try {
      const user = auth.currentUser
      if (user) {
        // 1) Atualiza o nome no Firebase Authentication (usado no login/navbar)
        await updateProfile(user, { displayName: nome.trim() })

        // 2) Atualiza os dados no Realtime Database.
        //    "update" altera só os campos informados (não apaga cpf/criadoEm)
        //    e cria o registro caso ele ainda não exista.
        //    O CPF só é enviado se ainda não existia (depois fica travado).
        await update(ref(db, `usuarios/${user.uid}/dados`), {
          nome: nome.trim(),
          email: user.email || usuario?.email || '',
          telefone,
          ...(cpfSalvo ? {} : { cpf }),
        })

        login({
          nome: nome.trim(),
          email: usuario?.email || '',
        })
        setCpfSalvo(true)
        setFaltando([])
        setMsgNome({ tipo: 'sucesso', texto: 'Dados atualizados com sucesso!' })
      }
    } catch (err) {
      console.error('[perfil] erro ao atualizar dados:', err)
      setMsgNome({ tipo: 'erro', texto: 'Não foi possível atualizar seus dados. Tente novamente.' })
    } finally {
      setSalvandoNome(false)
    }
  }

  async function handleEnviarResetSenha() {
    if (!usuario?.email) return

    setEnviandoReset(true)
    setMsgSenha(null)

    try {
      await sendPasswordResetEmail(auth, usuario.email)
      setMsgSenha({
        tipo: 'sucesso',
        texto: `E-mail de redefinição de senha enviado para ${usuario.email}. Verifique sua caixa de entrada.`,
      })
    } catch (err) {
      console.error('[perfil] erro ao enviar reset de senha:', err)
      setMsgSenha({
        tipo: 'erro',
        texto: 'Não foi possível enviar o e-mail de redefinição. Tente novamente mais tarde.',
      })
    } finally {
      setEnviandoReset(false)
    }
  }

  function handleSair() {
    logout()
    navigate('/')
  }

  const iniciais = (usuario?.nome || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')

  return (
    <>
      <Navbar />
      <main className="perfil-pagina">
        <header className="perfil-intro">
          <span className="perfil-etiqueta">Minha Conta</span>
          <h1>Configurações do Perfil</h1>
          <p className="perfil-subtitulo">
            Gerencie suas informações cadastrais, segurança da conta e preferências.
          </p>
        </header>

        <div className="perfil-grid">
          <section className="perfil-card">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Dados Pessoais
            </h2>

            <div className="perfil-usuario-topo">
              <div className="perfil-avatar">{iniciais || 'U'}</div>
              <div className="perfil-usuario-info">
                <h3>{usuario?.nome || 'Usuário'}</h3>
                <p>{usuario?.email || 'E-mail não informado'}</p>
              </div>
            </div>

            <form className="perfil-form" onSubmit={handleSalvarNome}>
              {msgNome && (
                <div className={`perfil-msg ${msgNome.tipo}`} role="status">
                  {msgNome.texto}
                </div>
              )}

              {faltando.length > 0 && (
                <div className="perfil-msg alerta" role="alert">
                  Seu cadastro está incompleto. Falta informar: <strong>{faltando.join(', ')}</strong>.
                  Preencha abaixo e clique em "Salvar Alterações".
                </div>
              )}

              <div className="perfil-grupo">
                <label htmlFor="perfil-nome">
                  Nome de exibição
                  {faltando.includes('Nome') && <span className="perfil-faltando">Faltando</span>}
                </label>
                <input
                  id="perfil-nome"
                  type="text"
                  className="perfil-input"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="perfil-grupo">
                <label htmlFor="perfil-cpf">
                  CPF
                  {faltando.includes('CPF') && <span className="perfil-faltando">Faltando</span>}
                </label>
                <input
                  id="perfil-cpf"
                  type="text"
                  inputMode="numeric"
                  className="perfil-input"
                  value={cpf}
                  onChange={(e) => setCpf(formatarCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  disabled={cpfSalvo}
                  required={!cpfSalvo}
                />
                {cpfSalvo && <p className="perfil-dica">O CPF não pode ser alterado depois de cadastrado.</p>}
              </div>

              <div className="perfil-grupo">
                <label htmlFor="perfil-telefone">
                  Telefone
                  {faltando.includes('Telefone') && <span className="perfil-faltando">Faltando</span>}
                </label>
                <input
                  id="perfil-telefone"
                  type="tel"
                  inputMode="numeric"
                  className="perfil-input"
                  value={telefone}
                  onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                  placeholder="(11) 91234-5678"
                  required
                />
              </div>

              <div className="perfil-grupo">
                <label htmlFor="perfil-email">E-mail cadastrado</label>
                <input
                  id="perfil-email"
                  type="email"
                  className="perfil-input"
                  value={usuario?.email || ''}
                  disabled
                />
                <p className="perfil-dica">O e-mail é vinculado à sua autenticação no Firebase.</p>
              </div>

              <button
                type="submit"
                className="btn-perfil"
                disabled={salvandoNome}
              >
                {salvandoNome ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </form>
          </section>

          <section className="perfil-card">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Segurança e Senha
            </h2>
            <p style={{ color: '#547374', fontSize: '14px', margin: '0 0 16px' }}>
              Deseja alterar sua senha de acesso? Enviaremos um link de redefinição seguro para o seu e-mail.
            </p>

            {msgSenha && (
              <div className={`perfil-msg ${msgSenha.tipo}`} role="status" style={{ marginBottom: '16px' }}>
                {msgSenha.texto}
              </div>
            )}

            <button
              type="button"
              className="btn-perfil btn-perfil-secundario"
              onClick={handleEnviarResetSenha}
              disabled={enviandoReset}
            >
              {enviandoReset ? 'Enviando e-mail...' : 'Enviar Link de Redefinição de Senha'}
            </button>
          </section>

          <section className="perfil-card">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Ações Rápidas
            </h2>
            <div className="perfil-acoes-box">
              <Link to="/historico" className="btn-perfil btn-perfil-secundario">
                Ver Histórico de Consultas
              </Link>
              <button type="button" className="btn-sair-perfil" onClick={handleSair}>
                Encerrar Sessão
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
