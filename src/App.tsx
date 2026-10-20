import './App.css'
import Cadastro from './pages/cadastro'
import DadosVeiculo from './pages/dadosVeiculo'
import Login from '../src/pages/Login'
import Home from './pages/home'
import Termos from './pages/termos'

function App() {
  if (window.location.pathname === '/cadastro') return <Cadastro />
  if (window.location.pathname === '/login') return <Login   />
  if (window.location.pathname === '/dados-veiculo') return <DadosVeiculo />  
 if (window.location.pathname === '/Termos') return <Termos />  



  return <Home />
}

export default App