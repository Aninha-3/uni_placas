import "../css/sobre.css";

function Sobre() {
  return (
    <main className="sobre-pagina">
      <header className="sobre-introducao">
        <span className="sobre-etiqueta">
          Tecnologia e orientação veicular
        </span>

        <h1>Sobre a UniPlacas</h1>

        <p>Sua segurança no trânsito começa aqui.</p>
      </header>

      <section className="sobre-apresentacao">
        <h2>Quem somos</h2>

        <p>
          A UniPlacas é um projeto acadêmico idealizado como uma
          startup de impacto social, voltada à consulta de informações
          veiculares e à orientação sobre débitos.
        </p>

        <p>
          Nossa proposta é simplificar o entendimento de pendências
          administrativas e financeiras, reunindo informações em uma
          plataforma intuitiva e de fácil navegação.
        </p>

        <p>
          Por meio de consultas simuladas por placa, apresentamos a
          situação do veículo e demonstramos o direcionamento para
          consultoria e alternativas de regularização de débitos.
        </p>
      </section>

      <section className="sobre-cards" aria-label="Nossos princípios">
        <article className="sobre-card">
          <h2>Missão</h2>

          <p>
            Facilitar o acesso e a compreensão de informações
            veiculares, oferecendo uma experiência clara e acessível
            e demonstrando alternativas de orientação financeira
            adequadas à realidade dos condutores.
          </p>
        </article>

        <article className="sobre-card">
          <h2>Visão</h2>

          <p>
            Tornar-se referência em consultoria e facilitação de
            serviços veiculares, com reconhecimento pela
            transparência, inovação e responsabilidade no
            atendimento aos condutores.
          </p>
        </article>

        <article className="sobre-card">
          <h2>Valores</h2>

          <ul>
            <li>Acessibilidade</li>
            <li>Transparência</li>
            <li>Responsabilidade</li>
            <li>Confiança</li>
            <li>Empatia</li>
            <li>Praticidade</li>
            <li>Inovação</li>
            <li>Segurança e privacidade</li>
          </ul>
        </article>
      </section>

      <aside className="sobre-aviso">
        <h2>Projeto acadêmico e demonstrativo</h2>

        <p>
          As consultas de veículos e CPFs utilizam dados fictícios.
          As orientações e propostas de parcelamento são simulações,
          sem realização de negociações ou pagamentos reais.
          A plataforma não substitui consultas aos órgãos oficiais
          de trânsito.
        </p>
      </aside>
    </main>
  );
}

export default Sobre;