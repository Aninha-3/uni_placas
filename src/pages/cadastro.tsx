import './cadastro.css';
function Cadastro(){
    return (
        <main>
            <h1>Criar conta</h1>
            <form>
                <label htmlFor="nome">nome completo</label>
                <input id="nome" name="nome" type="text" />

                <label htmlFor="senha">cpf</label>
                <input id="cpf" name="cpf" type="number" />

                <label htmlFor="senha">senha</label>
                <input id="senha" name="senha" type="password" />

                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" />

                <label htmlFor="telefone">Numero de Telefone</label>
                <input id="telefone" name="tel_num" type="tel" />

                <button type="submit">Cadastrar</button>
             </form>
        </main>

    )
}
export default Cadastro;