import type { ConsultaHistorico } from '../types/veiculo'

const CHAVE_HISTORICO = 'uniplacas_historico'

export function obterHistorico(): ConsultaHistorico[] {
  try {
    const dados = localStorage.getItem(CHAVE_HISTORICO)

    return dados ? JSON.parse(dados) as ConsultaHistorico[] : []
  } catch {
    return []
  }
}

export function salvarConsulta(
  consulta: ConsultaHistorico,
): void {
  const historico = obterHistorico()

  const atualizado = [consulta, ...historico].slice(0, 100)

  localStorage.setItem(
    CHAVE_HISTORICO,
    JSON.stringify(atualizado),
  )
}
