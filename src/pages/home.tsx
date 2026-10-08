import '../css/home.css'

function Home() {
  return (
    <main className="home-page">
      <header className="home-header">
        <a className="home-brand" href="/">
          <img
            className="cadastro-logo"
            src="src/visual/logo.jpeg"
            alt="Logo UniPlacas"
          />
        </a>

        <nav className="home-nav" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastro</a>
        </nav>
      </header>

      <section className="home-content" aria-labelledby="home-title">
        <p className="home-eyebrow">SERVIÇOS DE UTILIDADE PÚBLICA</p>
        <h1 id="home-title">
          Consulte e monitore placas de veículos em segundos
        </h1>

        <form
          className="home-search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="placa">
            Digite a placa do veículo
          </label>
          <input
            id="placa"
            name="placa"
            type="text"
            placeholder="Digite a placa do veículo"
          />
          <button type="submit">Consultar</button>
        </form>
      </section>

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
    </main>
  )
}

export default Home