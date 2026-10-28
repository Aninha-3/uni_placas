import './App.css'
import Cadastro from './pages/cadastro'
import DadosVeiculo from './pages/dadosVeiculo'
import Login from '../src/pages/Login'
import Home from './pages/home'
import Termos from './pages/termos'
import PrivateRoute from './components/privateRoutes'
import { Route, Routes } from 'react-router-dom'
import Historico from './pages/historico'

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/sobre" element={<Home />} />

      {/* Só logado */}
      <Route element={<PrivateRoute />}>
        <Route path="/veiculo/:placa" element={<DadosVeiculo />} />
        <Route path="/historico" element={<Historico />}/>
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App