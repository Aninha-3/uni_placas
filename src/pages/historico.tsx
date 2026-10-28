import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { listarConsultas, excluirConsulta } from '../services/historicoService'

function Historico() {
  const [consultas, setConsultas] = useState<any[]>([])

  useEffect(() => {
    async function carregar() {
      setConsultas(await listarConsultas())
    }
    carregar()
  }, [])

  async function handleExcluir(id: string) {
    await excluirConsulta(id)
    setConsultas((atual) => atual.filter((c) => c.id !== id))
  }

  return (
    <>
      <Navbar />
      <main>
        <h1>Meu histórico</h1>

        {consultas.length === 0 && <p>Nenhuma consulta ainda.</p>}

        <ul>
          {consultas.map((c) => (
            <li key={c.id}>
              {c.placa} - {c.veiculo}
              <Link to={`/veiculo/${c.placa}`}>Ver</Link>
              <button type="button" onClick={() => handleExcluir(c.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}

export default Historico