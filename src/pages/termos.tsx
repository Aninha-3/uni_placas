import 'react-router-dom'
import '../css/termosPriv.css'
import NavBar from '../components/navbar'
import Footer from '../components/footer'

function Termos() {
  return (
    <main>
      < NavBar />
      <h1>Termos de Uso e Política de Privacidade</h1>
      <section>
        <h2>1. Sobre a UniPlacas</h2>
        <p>
          A UniPlacas é uma plataforma desenvolvida para facilitar o acesso
          a informações veiculares, oferecendo consultas de placas,
          histórico de veículos e orientações sobre multas e débitos.
        </p>
        <p>
          Este site é um projeto acadêmico com finalidade educacional
          e demonstrativa.
        </p>
      </section>

      <section>
        <h2>2. Termos de Uso</h2>
        <p>
          Ao utilizar a UniPlacas, o usuário concorda em fazer uso
          responsável das funcionalidades disponibilizadas pela plataforma.
        </p>
        <p>
          As informações apresentadas são demonstrativas e não substituem
          consultas realizadas em órgãos oficiais de trânsito.
        </p>
      </section>

      <section>
        <h2>3. Política de Privacidade</h2>
        <p>
          A UniPlacas valoriza a privacidade e a segurança das informações
          dos usuários.
        </p>
        <p>
          Por ser um projeto acadêmico, as demonstrações devem utilizar
          dados fictícios, evitando a exposição de informações pessoais reais.
        </p>
        <p>
          Caso sejam coletados dados pessoais, seu tratamento deverá
          respeitar a Lei Geral de Proteção de Dados (LGPD).
        </p>
      </section>

      <section>
        <h2>4. Segurança das Informações</h2>
        <p>
          A UniPlacas busca demonstrar boas práticas de organização e
          proteção das informações disponibilizadas.
        </p>
        <p>
          O projeto não deve armazenar dados pessoais sensíveis ou
          informações confidenciais reais.
        </p>
      </section>

      <section>
        <h2>5. Contato e Suporte</h2>
        <p>
          Em caso de dúvidas sobre a plataforma, entre em contato pelo e-mail:
        </p>
        <p>uniplacas@gmail.com</p>
      </section>

      <section>
        <h2>6. Disposições Finais</h2>
        <p>
          A UniPlacas é um projeto acadêmico e não possui vínculo oficial
          com órgãos governamentais de trânsito.
        </p>
        <p>
          Suas funcionalidades são demonstrativas e podem sofrer
          alterações durante o desenvolvimento do projeto.
        </p>
      </section>

      < Footer /> 
    </main>
  );
}

export default Termos;