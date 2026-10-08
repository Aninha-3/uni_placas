import '..//css/dadosVeiculos.css'
import '../components/footer'
import Footer from '../components/footer'

///Header LOGINN  

function DadosVeiculo() {
  return (
    <>
      <section className="dados-veiculo">
        <h2>Dados do Veículo</h2>
        <p>Informações cadastradas referente ao veículo</p>
        <div className="dados-veiculo__container">
          <ul>
            <li>Marca/Modelo: Toyota Corolla</li>
            <li>Ano: 2020</li>
            <li>Cor: Prata</li>
            <li>Chassi: 9BWZZZ377VT004251</li>
            <li>Placa: ABC-1234</li>
            <li>Renavam: 123456789</li>
          </ul>
        </div>
      </section>


      <section className="dados_condutor">
        <h2>Dados do Condutor</h2>
        <p>Informações cadastradas referente ao condutor</p>

        <div className="dados_condutor_container">
          <ul>
            <li>Nome: João da Silva</li>
            <li>CPF: 123.456.789-00</li>
            <li>CNH: 1234567890</li>
            <li>Validade CNH: 31/12/2025</li>
            <li>Endereço: Rua das Flores, 123, Bairro Jardim, Cidade XYZ</li>
            <li>Telefone: (11) 98765-4321</li>
          </ul>
        </div>  
      </section>

      <button className="btn_consultar" onClick={() => window.history.back()}>Nova Consulta de Placa</button>

    <Footer />
    </>
  )
}

export default DadosVeiculo;