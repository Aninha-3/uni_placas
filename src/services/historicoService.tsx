// src/services/historicoService.ts

export interface Consulta {
  id: string
  placa: string
  veiculo: string
  data: string
  situacao: string
}

const CHAVE = 'historico-consultas'

export function listarConsultas(): Consulta[] {
  const salvo = localStorage.getItem(CHAVE)
  return salvo ? JSON.parse(salvo) : []
}

export function salvarConsulta(consulta: Consulta) {
  const lista = listarConsultas()
  lista.unshift(consulta)
  localStorage.setItem(CHAVE, JSON.stringify(lista))
}

export function excluirConsulta(id: string) {
  const lista = listarConsultas().filter((c) => c.id !== id)
  localStorage.setItem(CHAVE, JSON.stringify(lista))
}