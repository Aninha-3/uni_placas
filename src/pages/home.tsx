import '../css/home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import fundo from '../Visual/video/fundo.mp4'

function Home() {
  
  const [placa, setPlaca] = useState('');

  const navigate = useNavigate();

  function handleConsultar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const placaFormatada = placa
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();

    if (!placaFormatada) {
      alert('Digite a placa do veículo.');
      return;
    }

    navigate(`/veiculo/${placaFormatada}`);
  
   }

  return (
    <main className="home-page">
     <Navbar />
 
       <section
      className="home-content"
      aria-labelledby="home-title"
    >
      <p className="home-eyebrow">
        SERVIÇOS DE UTILIDADE PÚBLICA
      </p>

      <h1 id="home-title">
        Consulte e monitore placas de veículos em segundos
      </h1>

      <form
        className="home-search"
        onSubmit={handleConsultar}
      >
        <label className="sr-only" htmlFor="placa">
          Digite a placa do veículo
        </label>

        <input
          id="placa"
          name="placa"
          type="text"
          placeholder="Digite a placa do veículo"
          value={placa}
          onChange={(event) =>
            setPlaca(event.target.value)
          }
          maxLength={8}
        />

        <button type="submit">
          Consultar
        </button>
      </form>
    </section>
      
      <video className="home-video" autoPlay loop muted playsInline>
        <source src={fundo} type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      <section className="home-services" aria-labelledby="services-title">
        <h1 id="services-title">Nossos serviços</h1>

        <article className="service-card">
          <img src="src/visual/consulta_rapida_corrigido.png" alt="Consulta Rápida" />
          <h2 className="consulta-rapida">Consulta Rápida</h2>
          <p className="consulta-rapida-text">
            Obtenha dados estruturados de qualquer veículo diretamente das bases
            de dados brasileiras atualizadas.
          </p>
        </article>

        <article className="service-card">
          <img src="src/visual/historico_completo_corrigido.png" alt="Histórico Completo" />
          <h2 className="historico-completo">Histórico Completo</h2>
          <p className="historico-completo-text">
            Monitore o histórico completo de qualquer veículo.
          </p>
        </article>

        <article className="service-card">
          <img src="src/visual/armazenamento_seguro_corrigido.png" alt="Armazenamento Seguro" />
          <h2 className="storage-seguro">Armazenamento Seguro</h2>
          <p className="storage-seguro-text">
            Guarde as placas consultadas e crie um portfólio digital blindado
            de histórico veicular.
          </p>
        </article>
      </section>

    <Footer />
    
    </main>
  )
}

export default Home