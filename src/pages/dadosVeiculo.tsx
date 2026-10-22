import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Navbar from '../components/navbar'
import Footer from '../components/footer'

import { consultarVeiculo } from '../services/veiculosService'
import { salvarConsulta } from '../services/historicoService'

import type { Veiculo } from '../types/veiculo'

import '../css/dadosVeiculos.css'

function DadosVeiculo() {
  const navigate = useNavigate()
  const { placa } = useParams()

  const [veiculo, setVeiculo] = useState<Veiculo | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function buscarVeiculo() {
      setCarregando(true)
      setErro('')
      setVeiculo(null)

      if (!placa) {
        setErro('Nenhuma placa foi informada.')
        setCarregando(false)
        return
      }

      try {
        const resultado = await consultarVeiculo(placa)

        if (!ativo) return

        if (!resultado) {
          setErro('Não encontramos um veículo com essa placa.')
          return
        }

        setVeiculo(resultado)

        salvarConsulta({
          id: crypto.randomUUID(),
          placa: resultado.placa,
          veiculo: `${resultado.marca} ${resultado.modelo}`,
          data: new Date().toISOString(),
          situacao: 'Concluída',
        })
      } catch {
        if (ativo) {
          setErro('Não foi possível consultar o veículo. Tente novamente.')
        }
      } finally {
        if (ativo) {
          setCarregando(false)
        }
      }
    }

    buscarVeiculo()

    return () => {
      ativo = false
    }
  }, [placa])

  return (
    <>
      <Navbar />

      <main className="dados-container">
        <button
          className="dados-voltar"
          type="button"
          onClick={() => navigate('/')}
        >
          ← Voltar para o início
        </button>

        <header className="dados-header">
          <span className="dados-etiqueta">CONSULTA DE VEÍCULO</span>

          <h1>Dados do veículo</h1>

          <p>
            Confira as informações disponíveis sobre o veículo consultado.
          </p>
        </header>

        {carregando && (
          <section className="dados-mensagem" aria-live="polite">
            <p>Consultando informações do veículo...</p>
          </section>
        )}

        {!carregando && erro && (
          <section className="dados-mensagem dados-erro" role="alert">
            <h2>Consulta não encontrada</h2>
            <p>{erro}</p>

            <button
              className="dados-botao"
              type="button"
              onClick={() => navigate('/')}
            >
              Fazer nova consulta
            </button>
          </section>
        )}

        {!carregando && veiculo && (
          <>
            <section className="dados-card">
              <div className="dados-card-topo">
                <div>
                  <span className="dados-subtitulo">VEÍCULO CONSULTADO</span>
                  <h2>
                    {veiculo.marca} {veiculo.modelo}
                  </h2>
                  <p>
                    Ano de fabricação: {veiculo.ano}
                  </p>
                </div>

                <span className="dados-status">Consulta concluída</span>
              </div>

              <div className="dados-placa-area">
                <span>PLACA</span>

                <div className="dados-placa">
                  <span className="dados-placa-faixa">BR</span>
                  <strong>{veiculo.placa}</strong>
                </div>
              </div>

              <div className="dados-grid">
                <article className="dados-item">
                  <span>Marca</span>
                  <strong>{veiculo.marca}</strong>
                </article>

                <article className="dados-item">
                  <span>Modelo</span>
                  <strong>{veiculo.modelo}</strong>
                </article>

                <article className="dados-item">
                  <span>Ano</span>
                  <strong>{veiculo.ano}</strong>
                </article>

                <article className="dados-item">
                  <span>Cor</span>
                  <strong>{veiculo.cor}</strong>
                </article>

                <article className="dados-item">
                  <span>Renavam</span>
                  <strong>{veiculo.renavam}</strong>
                </article>

                <article className="dados-item">
                  <span>Chassi</span>
                  <strong>{veiculo.chassi}</strong>
                </article>
              </div>

              <p className="dados-aviso">
                Ambiente de demonstração: os dados apresentados são fictícios
                e servem apenas para testar a interface.
              </p>
            </section>

            <section className="dados-acoes">
              <button
                className="dados-botao"
                type="button"
                onClick={() => navigate('/')}
              >
                Consultar outro veículo
              </button>

              <button
                className="dados-botao dados-botao-secundario"
                type="button"
                onClick={() => navigate('/historico')}
              >
                Ver histórico
              </button>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  )
}

export default DadosVeiculo

