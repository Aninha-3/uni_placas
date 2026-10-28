export interface Veiculo {
  placa: string
  marca: string
  modelo: string
  ano: number
  cor: string
  renavam: string
  chassi: string
}

export interface ConsultaHistorico {
  id: string
  placa: string
  veiculo: string
  data: string
  situacao: string
}
