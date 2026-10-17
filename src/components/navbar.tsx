import '../css/navBar.css'
import { Link } from 'react-router-dom'
import logo from '../visual/logo.jpeg'

function Navbar() {
  return (
    <header className="home-header">
      <Link to="/" className="home-brand">
        <img src={logo}
          className="cadastro-logo"
          alt="Logo UniPlacas"
        />
      </Link>
      
      <nav className="home-nav" aria-label="Navegação principal">
        <Link to="/sobre">Sobre</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
    </header>
  )
}

export default Navbar