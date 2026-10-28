import '../css/Login.css'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Navbar from '../components/navbar'
import { useAuth } from '../contexts/AuthContextMemoria'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from?.pathname ?? '/'

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleEntrar() {
    if (!email || !senha) {
        console.log('clicou', email, senha, destino)

      setErro('Preencha e-mail e senha.')
      return
    }

    // TODO: quando o back-end existir, validar email/senha na API aqui.
    login({ nome: email.split('@')[0], email })
    navigate(destino, { replace: true })
  }

  function handleEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') handleEntrar()
  }

  return (
    <>
      <Navbar />
      <section id="login">
        <p className="login-tagline">
          Consulte e monitore<br />
          placas de veículos em<br />
          segundos.
        </p>

        <h1>Acesse sua conta</h1>
        <p>Insira seus dados para prosseguir com a consulta</p>

        <label className="login-label" htmlFor="email">E-mail cadastrado</label>
        <input
          className="login-input"
          id="email"
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEnter}
        />

        <label className="login-label" htmlFor="senha">Sua senha de acesso</label>
        <input
          className="login-input"
          id="senha"
          type="password"
          placeholder="Sua senha de acesso"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={handleEnter}
        />

        {erro && <p role="alert">{erro}</p>}

        <button type="button" className="btnLogin" onClick={handleEntrar}>
          Entrar no sistema
        </button>

        <p>Não tem uma conta?</p>
        <Link to="/cadastro">Clique aqui</Link>
      </section>
    </>
  )
}