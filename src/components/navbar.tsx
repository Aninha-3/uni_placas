import '../css/navBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextMemoria'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleSair() {
    logout()
    navigate('/')
  }

  return (
    <header className="home-header">
      <Link to="/" className="home-brand">
        <h1>UNIPLACAS</h1>
      </Link>

      <nav className="home-nav" aria-label="Navegação principal">
        <Link to="/sobre">Sobre</Link>

        {isAuthenticated ? (
          <>
            <Link to="/historico">Histórico</Link>
            <button type="button" onClick={handleSair}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar