import './App.css'
import Cadastro from './pages/cadastro'
import DadosVeiculo from './pages/dadosVeiculo'
import Login from '../src/pages/Login'
import Home from './pages/home'
import Termos from './pages/termos'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dados-veiculo" element={<DadosVeiculo />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/sobre" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
