import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get, set, update, serverTimestamp } from 'firebase/database';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { auth, db } from '../Firebase/firebase';
import { consultarVeiculo } from '../services/veiculosService';
import { consultarPrecoFipe, type PrecoFipe } from '../services/fipeService';
import { salvarConsulta } from '../services/historicoService';
import type { Veiculo } from '../types/veiculo';
import PlanosPagamento from '../components/planosPagamento';
import '../css/dadosVeiculos.css';

// Retorna o veículo com licenciamento em dia e todas as multas pagas
function aplicarRegularizacao(veiculo: Veiculo): Veiculo {
  return {
    ...veiculo,
    licenciamento: 'Em dia',
    multas: veiculo.multas.map((m) => ({ ...m, situacao: 'Paga' })),
  };
}

// Texto da situação salvo no histórico. Considera licenciamento E multas,
// para não mostrar "Em dia" quando ainda existem multas em aberto.
function situacaoDoVeiculo(veiculo: Veiculo): string {
  if (veiculo.licenciamento === 'Atrasado') return 'Licenciamento Atrasado';
  if (veiculo.multas.some((m) => m.situacao === 'Em aberto')) return 'Multas em aberto';
  return 'Licenciamento Em dia';
}

export default function DadosVeiculo() {
  const { placa } = useParams<{ placa: string }>();
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [fipe, setFipe] = useState<PrecoFipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [fipeLoading, setFipeLoading] = useState(false);
  const [erroPagamento, setErroPagamento] = useState('');

  useEffect(() => {
    if (!placa) return;
    const placaAtual = placa;
    const controller = new AbortController();

    async function carregarDados() {
      setLoading(true);
      setErro('');
      setVeiculo(null);
      setFipe(null);

      try {
        const dadosConsulta = await consultarVeiculo(placaAtual);
        if (controller.signal.aborted) return;

        if (!dadosConsulta) {
          setErro('Veículo não encontrado ou placa inválida.');
          return;
        }

        // Verifica no banco (veiculos/{placa}) se os débitos desta placa já foram pagos.
        // Se sim, o status do banco prevalece sobre o da consulta.
        let dadosDetran = dadosConsulta;
        try {
          const pagamento = await get(ref(db, `veiculos/${dadosConsulta.placa}`));
          if (pagamento.exists()) dadosDetran = aplicarRegularizacao(dadosConsulta);
        } catch (pagErr) {
          console.warn('Falha ao verificar pagamento no banco:', pagErr);
        }
        if (controller.signal.aborted) return;

        setVeiculo(dadosDetran);
        setLoading(false);

        salvarConsulta({
          placa: dadosDetran.placa,
          veiculo: `${dadosDetran.marca} ${dadosDetran.modelo}`,
          data: new Date().toISOString(),
          situacao: situacaoDoVeiculo(dadosDetran),
        }).catch((histErr) => console.warn('Falha ao salvar consulta no histórico:', histErr));

        setFipeLoading(true);
        try {
          const dadosFipe = await consultarPrecoFipe(dadosDetran.codigoFipe, dadosDetran.ano, controller.signal);
          if (!controller.signal.aborted) setFipe(dadosFipe);
        } catch (fipeErr) {
          if (controller.signal.aborted) return;
          console.warn('Falha na consulta FIPE:', fipeErr);
          setFipe(null);
        } finally {
          if (!controller.signal.aborted) setFipeLoading(false);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error('Erro na consulta:', err);
        setErro('Ocorreu um erro ao consultar as bases de dados. Tente novamente mais tarde.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    carregarDados();
    return () => controller.abort();
  }, [placa]);

  // Chamado quando o pagamento é confirmado: atualiza a tela e grava no banco
  async function handleRegularizarDebitos() {
    if (!veiculo) return;
    const regularizado = aplicarRegularizacao(veiculo);
    setVeiculo(regularizado);
    setErroPagamento('');

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Usuário não autenticado.');

      // 1) Registro global do pagamento: qualquer usuário que consultar a placa verá "Em dia"
      await set(ref(db, `veiculos/${veiculo.placa}`), {
        licenciamento: 'Em dia',
        multasPagas: true,
        pagoEm: serverTimestamp(),
        pagoPor: uid,
      });

      // 2) Atualiza a situação no histórico do usuário
      await update(ref(db, `usuarios/${uid}/historico/${veiculo.placa}`), {
        situacao: situacaoDoVeiculo(regularizado),
      });
    } catch (err) {
      console.error('Falha ao registrar pagamento no banco:', err);
      setErroPagamento('O pagamento foi processado, mas não conseguimos registrá-lo. Ao consultar a placa novamente, os débitos podem aparecer como pendentes.');
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="dados-veiculo loading">
          <h2>Consultando base de dados...</h2>
          <p>Aguarde enquanto verificamos a placa {placa}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (erro || !veiculo) {
    return (
      <>
        <Navbar />
        <main className="dados-veiculo erro">
          <h2>Ops!</h2>
          <p>{erro}</p>
          <Link to="/" className="btn-voltar">Fazer Nova Consulta</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="dados-veiculo">
        <header className="veiculo-header">
          <div>
            <h1>Placa: {veiculo.placa}</h1>
            <p className="veiculo-modelo">{veiculo.marca} {veiculo.modelo}</p>
          </div>
          <span className={`badge-licenciamento ${veiculo.licenciamento === 'Em dia' ? 'ok' : 'atrasado'}`}>
            Licenciamento {veiculo.licenciamento}
          </span>
        </header>

        <div className="veiculo-grid">
          <section className="info-card">
            <h2>Valor de Mercado (Tabela FIPE)</h2>
            {fipe ? (
              <div className="info-content">
                <p><strong>Marca:</strong> {fipe.marca}</p>
                <p><strong>Modelo:</strong> {fipe.modelo}</p>
                <p><strong>Ano/Modelo:</strong> {fipe.anoModelo}</p>
                <p className="fipe-valor"><strong>Valor:</strong> {fipe.valor}</p>
                <p className="fipe-ref">Mês de referência: {fipe.mesReferencia}</p>
              </div>
            ) : fipeLoading ? (
              <p>Consultando valor FIPE...</p>
            ) : (
              <p>Valor FIPE temporariamente indisponível para este modelo.</p>
            )}
          </section>

          <section className="info-card">
            <h2>Dados Técnicos</h2>
            <div className="info-content">
              <p><strong>Cor:</strong> {veiculo.cor}</p>
              <p><strong>Ano:</strong> {veiculo.ano}</p>
              <p><strong>Renavam:</strong> {veiculo.renavam}</p>
              <p><strong>Chassi:</strong> {veiculo.chassi}</p>
              <p><strong>Código FIPE:</strong> {veiculo.codigoFipe}</p>
            </div>
          </section>
        </div>

        <section className="info-card multas-section">
          <h2>Infrações e Multas ({veiculo.multas.length})</h2>
          {veiculo.multas.length === 0 ? (
            <p className="sem-multas">Não constam infrações registradas para este veículo.</p>
          ) : (
            <div className="multas-lista">
              {veiculo.multas.map((multa, idx) => (
                <div key={idx} className="multa-item">
                  <div className="multa-detalhes">
                    <strong>{multa.descricao}</strong>
                    <span>Data: {new Date(multa.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="multa-valores">
                    <span className="multa-preco">R$ {multa.valor.toFixed(2).replace('.', ',')}</span>
                    <span className={`badge-multa ${multa.situacao === 'Paga' ? 'paga' : 'aberta'}`}>
                      {multa.situacao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {erroPagamento && <p className="aviso-pagamento" role="alert">{erroPagamento}</p>}

        <PlanosPagamento
          placa={veiculo.placa}
          multas={veiculo.multas}
          licenciamento={veiculo.licenciamento}
          onPagamentoConcluido={handleRegularizarDebitos}
        />

        <div className="acoes-footer">
          <Link to="/" className="btn-voltar">Nova Consulta</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
