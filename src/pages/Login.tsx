import '../css/Login.css';
import Navbar from '../components/navbar';

export default function Login() {
  return (
    <>
      <Navbar />
    <section id="login">
      <p className="login-tagline">
        Consulte e monitore<br />
        placas de veículos em<br />
        segundos.
      </p>
      <h1>Acesse sua conta</h1>
      <p>Insira seus dados para proseguir com a consulta</p>
      <label className="login-label" htmlFor="email">E-mail cadastrado</label>
      <input className="login-input" id="email" type="text" placeholder="E-mail" />
      <label className="login-label" htmlFor="senha">Sua senha de acesso</label>
      <input className="login-input" id="senha" type="password" placeholder="Sua senha de acesso" />
      <button type="submit" className="btnLogin">Entrar no sistema</button>
      <p>Não tem uma conta?</p>
      <a href='./cadastro'>Clique aqui</a>
    </section>
    </>
  );
}
