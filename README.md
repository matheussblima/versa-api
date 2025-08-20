<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Versa API

API desenvolvida com NestJS seguindo os princípios da Arquitetura Limpa (Clean Architecture).

## Estrutura do Projeto

O projeto está organizado seguindo os princípios da Arquitetura Limpa:

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # Entidades de negócio
│   └── repositories/         # Interfaces dos repositórios
├── application/              # Camada de Aplicação
│   ├── dto/                 # Data Transfer Objects
│   └── use-cases/           # Casos de uso da aplicação
├── infrastructure/           # Camada de Infraestrutura
│   ├── database/            # Implementações do banco de dados
│   └── http/                # Serviços HTTP externos
└── interfaces/               # Camada de Interface
    └── controllers/         # Controllers da API
```

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações escaláveis
- **Prisma**: ORM para modelagem e acesso ao banco de dados
- **PostgreSQL**: Banco de dados relacional
- **Axios**: Cliente HTTP para chamadas externas

## Modelo de Dados

### Tabela: Unidades

- `id` (UUID, Primary Key)
- `nome` (String)
- `descricao` (String, opcional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Tabela: Pontos de Medição

- `id` (UUID, Primary Key)
- `nome` (String)
- `descricao` (String, opcional)
- `subunidade` (String)
- `unidadeId` (UUID, Foreign Key para Unidades)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Configuração

1. **Instalar dependências:**

   ```bash
   yarn install
   ```

2. **Configurar banco de dados:**
   - Copie o arquivo `config.example.env` para `.env`
   - Configure a URL do banco de dados PostgreSQL

3. **Executar migrações:**

   ```bash
   npx prisma migrate dev
   ```

4. **Gerar cliente Prisma:**
   ```bash
   npx prisma generate
   ```

## Executando a Aplicação

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn start:prod
```

## Documentação da API (Swagger)

A documentação interativa da API está disponível através do Swagger UI:

- **URL**: http://localhost:3000/api
- **Descrição**: Interface interativa para testar todos os endpoints da API
- **Recursos**:
  - Teste direto dos endpoints
  - Visualização dos schemas de request/response
  - Exemplos de uso
  - Códigos de status HTTP

## Endpoints da API

### Unidades

- `POST /unidades` - Criar unidade
- `GET /unidades` - Listar todas as unidades
- `GET /unidades/:id` - Buscar unidade por ID
- `PATCH /unidades/:id` - Atualizar unidade
- `DELETE /unidades/:id` - Deletar unidade

### Pontos de Medição

- `POST /pontos-de-medicao` - Criar ponto de medição
- `GET /pontos-de-medicao` - Listar todos os pontos de medição
- `GET /pontos-de-medicao/:id` - Buscar ponto de medição por ID
- `GET /pontos-de-medicao/unidade/:unidadeId` - Buscar pontos de medição por unidade
- `PATCH /pontos-de-medicao/:id` - Atualizar ponto de medição
- `DELETE /pontos-de-medicao/:id` - Deletar ponto de medição

## Exemplos de Uso

### Criar uma Unidade

```bash
curl -X POST http://localhost:3000/unidades \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Unidade Industrial A",
    "descricao": "Unidade principal de produção"
  }'
```

### Criar um Ponto de Medição

```bash
curl -X POST http://localhost:3000/pontos-de-medicao \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Sensor de Temperatura 1",
    "descricao": "Sensor de temperatura na linha 1",
    "subunidade": "Linha de Produção 1",
    "unidadeId": "uuid-da-unidade"
  }'
```

## Arquitetura Limpa

O projeto segue os princípios da Arquitetura Limpa:

1. **Independência de Frameworks**: A lógica de negócio não depende de frameworks externos
2. **Testabilidade**: Cada camada pode ser testada independentemente
3. **Independência de UI**: A interface pode ser alterada sem afetar a lógica de negócio
4. **Independência de Banco de Dados**: A lógica de negócio não depende do banco de dados
5. **Independência de Agentes Externos**: A lógica de negócio não conhece o mundo exterior

## Formatação e Linting

O projeto está configurado com Prettier e ESLint para manter a consistência do código:

```bash
# Formatar código
yarn format

# Verificar e corrigir problemas de linting
yarn lint

# Formatar e lintar automaticamente
yarn format && yarn lint
```

### Configuração do VS Code

O projeto inclui configurações do VS Code para formatação automática:

- **Formatação automática ao salvar** (Prettier)
- **Correção automática do ESLint** ao salvar
- **Extensões recomendadas** para melhor experiência

## Testes

```bash
# Testes unitários
yarn test

# Testes e2e
yarn test:e2e
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
