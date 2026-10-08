import './App.css'
import Cadastro from './pages/cadastro'
import DadosVeiculo from './pages/dadosVeiculo'
import Home from './pages/home'

function App() {
  if (window.location.pathname === '/cadastro') return <Cadastro />
  if (window.location.pathname === '/dados-veiculo') return <DadosVeiculo />  
   
  return <Home />
}

export default App