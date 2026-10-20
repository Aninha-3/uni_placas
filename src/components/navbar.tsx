import '../css/navBar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="home-header">
      <Link to="/" className="home-brand">
        <h1>UNIPLACAS</h1>
      </Link>
      
      <nav className="home-nav" aria-label="Navegação principal">
        <Link to="/sobre">Sobre</Link>
        <Link to="/login">Login</Link>
        <Link to="/cadastro">Cadastro</Link>
      </nav>
    </header>
  )
}

export default Navbar