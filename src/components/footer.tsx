import '../css/footer.css';
import logo from '../Visual/imgLogoP.jpeg'

function Footer() {
  return (
    <footer className="footerBase">
       <img className="logo" src={logo} alt="Logo UniPlacas" />
      <p>© 2026 UNIPLACAS. Todos os direitos reservados.</p>
      <p>Para mais dúvidas, entre em contato conosco.</p>
        <p>Email:uniplacas@gmail.com</p>
    </footer>
  );
}

export default Footer;