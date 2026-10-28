import "../css/footer.css";
import logo from "../Visual/logo.jpeg";

function Footer() {
  return (
    <footer className="footerBase">

      <div className="footerConteudo">

        <div className="footerSobre">
          <div className="footerMarca">
            <img
              className="logo"
              src={logo}
              alt="Logo UniPlacas"
            />
            <h2>UniPlacas</h2>
          </div>

          <p>Sua segurança no trânsito começa aqui.</p>
        </div>

        <nav className="footerLinks" aria-label="Navegação do rodapé">
          <h3>Navegação</h3>
          <a href="/">Início</a>
        </nav>

        <div className="footerLinks">
          <h3>Suporte</h3>
          <a href="/sac">Fale conosco</a>
          <a href= "/termos.tsx"> Termos de uso e Politica de privacidade</a>
        </div>

      </div>

      <div className="footerFinal">
        <p>© 2026 UniPlacas. Todos os direitos reservados.</p>
        <p>Projeto acadêmico • Site demonstrativo</p>
      </div>

    </footer>
  );
}

export default Footer;