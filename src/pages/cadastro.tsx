import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, set, serverTimestamp } from 'firebase/database'
import { FirebaseError } from 'firebase/app'
import { auth, db } from '../Firebase/firebase'
import { useAuth } from '../contexts/AuthContextMemoria'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../css/cadastro.css'

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

function mensagemDeErro(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado.'
      case 'auth/invalid-email':
        return 'E-mail inválido.'
      case 'auth/weak-password':
        return 'A senha precisa ter pelo menos 6 caracteres.'
      case 'auth/operation-not-allowed':
        return 'Cadastro por e-mail/senha não está habilitado no Firebase.'
      case 'auth/network-request-failed':
        return 'Falha de conexão. Verifique sua internet e tente novamente.'
    }
  }
  return 'Não foi possível concluir o cadastro. Tente novamente.'
}

function Cadastro() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando) return

    setErro('')

    if (!cpfValido(cpf)) {
      setErro('Informe um CPF válido.')
      return
    }

    if (!telefoneValido(telefone)) {
      setErro('Informe um telefone válido com DDD, ex: (11) 91234-5678.')
      return
    }

    setEnviando(true)

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email.trim(), senha)
      const user = credencial.user

      await updateProfile(user, { displayName: nome.trim() })

      try {
        await set(ref(db, `usuarios/${user.uid}/dados`), {
          nome: nome.trim(),
          cpf: cpf.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          criadoEm: serverTimestamp(),
        })
      } catch (dbError) {
        console.warn('[cadastro] aviso: falha ao gravar dados complementares:', dbError)
      }

      login({ nome: nome.trim(), email: email.trim() })
      navigate('/', { replace: true })
    } catch (error) {
      console.error('[cadastro] erro:', error)
      setErro(mensagemDeErro(error))
      setEnviando(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="cadastro-page">
        <section className="cadastro-content">
          <h1>Criar conta</h1>
          <p className="cadastro-intro">Crie uma nova conta de usuário para gerenciar suas consultas.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />

            <label htmlFor="cpf">CPF</label>
            <input id="cpf" name="cpf" type="text" inputMode="numeric" required placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(formatarCpf(e.target.value))} />

            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" required minLength={6} autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="telefone">Número de telefone</label>
            <input id="telefone" name="tel_num" type="tel" inputMode="numeric" required placeholder="(11) 91234-5678" value={telefone} onChange={(e) => setTelefone(formatarTelefone(e.target.value))} />

            {erro && <p className="cadastro-erro" role="alert">{erro}</p>}

            <button type="submit" disabled={enviando}>
              {enviando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Cadastro
