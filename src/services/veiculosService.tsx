import type { Veiculo } from '../types/veiculo'

const veiculos: Veiculo[] = [
  {
    placa: 'ABC1D23',
    marca: 'Toyota',
    modelo: 'Corolla',
    ano: 2020,
    cor: 'Prata',
    renavam: '12345678901',
    chassi: 'CHASSI-EXEMPLO-001',
  },
  {
    placa: 'DEF4G56',
    marca: 'Honda',
    modelo: 'Civic',
    ano: 2022,
    cor: 'Preto',
    renavam: '10987654321',
    chassi: 'CHASSI-EXEMPLO-002',
  },
]

export async function consultarVeiculo(
  placa: string,
): Promise<Veiculo | null> {
  const placaFormatada = placa
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()

  const resultado = veiculos.find(
    (veiculo) => veiculo.placa === placaFormatada,
  )

  return resultado ?? null
}
