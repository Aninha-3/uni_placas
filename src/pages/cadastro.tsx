import '../css/cadastro.css';
import NavBar from '../components/navbar';

function Cadastro() {
  return (
    <main className="cadastro-page">
      < NavBar />  
      <h2>Criar conta</h2>
      <p className="cadastro-intro">Crie uma nova conta de usuário.</p>
      <form>
        <label htmlFor="nome">Nome completo</label>
        <input id="nome" name="nome" type="text" />

        <label htmlFor="cpf">CPF</label>
        <input id="cpf" name="cpf" type="text" inputMode="numeric" />

        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" />

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="telefone">Número de telefone</label>
        <input id="telefone" name="tel_num" type="tel" />

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}

export default Cadastro;
