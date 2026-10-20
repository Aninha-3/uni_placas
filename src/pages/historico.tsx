
function Historico() {
  return (
    <main>
      <header>
        <h1>Histórico de Consultas</h1>
        <p>
          Bem-vindo ao seu histórico UniPlacas! Aqui você pode acompanhar
          suas consultas e negociações anteriores.
        </p>
      </header>

      <section>
        <h2>Consultas realizadas</h2>
        <p>Confira os veículos consultados anteriormente.</p>

        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Veículo</th>
              <th>Data</th>
              <th>Situação</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>ABC1D23</td>
              <td>Honda Civic</td>
              <td>05/10/2026</td>
              <td>Concluída</td>
            </tr>

            <tr>
              <td>DEF4G56</td>
              <td>Fiat Argo</td>
              <td>03/10/2026</td>
              <td>Concluída</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Negociações realizadas</h2>
        <p>
          Acompanhe suas negociações de multas e consulte a situação
          de cada uma.
        </p>

        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Situação</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>ABC1D23</td>
              <td>Multa de trânsito</td>
              <td>05/10/2026</td>
              <td>Em andamento</td>
            </tr>

            <tr>
              <td>DEF4G56</td>
              <td>Multa de trânsito</td>
              <td>03/10/2026</td>
              <td>Finalizada</td>
            </tr>
          </tbody>
        </table>
      </section>

      <nav aria-label="Navegação do histórico">
        <button type="button">Voltar para Consulta</button>
        <button type="button">Voltar para Login</button>
      </nav>
    </main>
  );
}

export default Historico;