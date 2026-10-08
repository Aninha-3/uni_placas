import '../css/footer.css';
import logo from '../Visual/imgLogoP.jpeg'

function Footer() {
  return (
    <footer className="footer">
       <img className="logo" src={logo} alt="Logo UniPlacas" />
      <p>© 2026 UNIPLACAS. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;