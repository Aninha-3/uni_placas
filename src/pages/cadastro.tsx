import '../css/cadastro.css';

function CabecalhoCadastro() {
  return (
    <header className="cadastro-header">
      <a className="cadastro-brand" href="/" aria-label="Página inicial">
        <img className="cadastro-logo" src="/logo.png" alt="Logo UniPlacas" />
      </a>
      <nav className="cadastro-nav" aria-label="Navegação da página">
        <a href="/">Home</a>
        <a href="/login">Já tem uma conta? Entrar</a>
      </nav>
    </header>
  );
}

function Cadastro() {
  return (
    <main className="cadastro-page">
      <CabecalhoCadastro />
      <h1>Criar conta</h1>
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
