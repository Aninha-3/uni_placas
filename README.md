# UniPlacas

Plataforma web de **consulta veicular**: o usuário digita uma placa e vê os dados do veículo, o valor na Tabela FIPE, a situação do licenciamento e as multas, com opção de regularizar os débitos (PIX, cartão ou boleto).

> **Projeto acadêmico e demonstrativo.** Os dados do veículo (modelo, chassi, renavam, multas, licenciamento) são **fictícios**, gerados a partir da placa. O pagamento é **simulado** — nenhum valor é cobrado. Apenas o valor FIPE vem de uma API real.

## Funcionalidades

- **Cadastro e login** com e-mail e senha (Firebase Authentication), com validação de CPF e telefone.
- **Consulta por placa** (formato antigo `ABC1234` e Mercosul `ABC1D23`):
  - dados técnicos do veículo;
  - valor de mercado pela Tabela FIPE (via [BrasilAPI](https://brasilapi.com.br));
  - licenciamento (em dia / atrasado) e lista de multas.
- **Regularização de débitos** com planos de parcelamento. Após o pagamento, a placa fica registrada como regularizada no banco e aparece "em dia" nas próximas consultas, para qualquer usuário.
- **Histórico de consultas** de cada usuário, com busca e exclusão.
- **Perfil**: editar nome e telefone, completar dados faltantes (o CPF fica travado depois de salvo) e redefinir a senha por e-mail.
- Páginas institucionais: Sobre e Termos de Uso/Privacidade.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Front-end | React 19 + TypeScript |
| Build / dev server | Vite |
| Rotas | React Router |
| Autenticação | Firebase Authentication (e-mail/senha) |
| Banco de dados | Firebase Realtime Database |
| Hospedagem | Firebase Hosting |
| Preço FIPE | BrasilAPI |
| Lint | Oxlint |

## Como rodar localmente

Pré-requisito: [Node.js](https://nodejs.org) 20.19+ ou 22.12+ (exigência do Vite).

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal (normalmente `http://localhost:5173`).

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint` | Roda o Oxlint |
| `npm run deploy` | Faz o build e publica no Firebase Hosting |

## Estrutura do projeto

```
src/
├── Firebase/firebase.ts         # Configuração do Firebase (auth e banco)
├── contexts/AuthContextMemoria.tsx  # Contexto do usuário logado
├── components/                  # Navbar, Footer, rotas privadas, planos de pagamento
├── pages/                       # Uma página por rota (home, login, cadastro, perfil...)
├── services/
│   ├── veiculosService.tsx      # Gera os dados fictícios do veículo a partir da placa
│   ├── fipeService.ts           # Consulta o preço FIPE na BrasilAPI (com cache)
│   └── historicoService.ts      # Lê/grava o histórico de consultas no banco
├── types/veiculo.ts             # Tipos Veiculo e Multa
├── css/                         # Um arquivo de estilo por página/componente
└── Visual/                      # Imagens e vídeo
```

### Rotas

| Rota | Página | Precisa de login? |
| --- | --- | --- |
| `/` | Início (busca por placa) | Não |
| `/login`, `/cadastro` | Login e cadastro | Não |
| `/sobre`, `/termos` | Institucionais | Não |
| `/veiculo/:placa` | Resultado da consulta | **Sim** |
| `/historico` | Histórico de consultas | **Sim** |
| `/perfil` | Perfil do usuário | **Sim** |

## Banco de dados (Realtime Database)

```
usuarios/
  {uid}/
    dados/        # nome, cpf, email, telefone, criadoEm
    historico/
      {placa}/    # placa, veiculo, data, situacao
veiculos/
  {placa}/        # licenciamento, multasPagas, pagoEm, pagoPor  (criado ao pagar)
```

As regras ficam em [`database.rules.json`](database.rules.json):

- cada usuário só lê e escreve em `usuarios/{seu uid}`;
- o CPF não pode ser alterado depois de gravado;
- `veiculos/{placa}` pode ser lido por qualquer usuário logado e só é gravado com o uid de quem pagou.

## Configuração do Firebase

1. Ative **E-mail/senha** em *Authentication → Sign-in method*.
2. Publique as regras do banco:
   ```bash
   npx firebase login
   npx firebase deploy --only database
   ```
   (ou cole o conteúdo de `database.rules.json` em *Realtime Database → Regras* e clique em Publicar).
3. Se o banco foi criado fora da região padrão (EUA), adicione `databaseURL` ao `firebaseConfig` em `src/Firebase/firebase.ts`.

> ⚠️ Sempre que alterar `database.rules.json`, publique de novo. As regras que valem são as que estão no Firebase, não as do arquivo. Se o banco estiver em "modo de teste", as regras expiram e todas as gravações passam a dar `PERMISSION_DENIED`.

## Deploy

```bash
npm run deploy
```

Gera o build e publica a pasta `dist/` no Firebase Hosting (projeto `uni-placas`).
