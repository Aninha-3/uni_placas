import './App.css'
import Cadastro from './pages/cadastro'
import Home from './pages/home'

function App() {
  if (window.location.pathname === '/cadastro') return <Cadastro />
  return <Home />
}

export default App