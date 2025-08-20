# 🚀 Desenvolvimento Local - Versa API

Este documento explica como rodar a aplicação em modo de desenvolvimento.

## 📋 Pré-requisitos

- Node.js 18+
- Yarn
- Docker (opcional)

## 🔧 Configuração Inicial

1. **Instalar dependências:**

   ```bash
   yarn install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/versa_api?schema=public"
   NODE_ENV=development
   ```

## 🎯 Comandos de Desenvolvimento

### **Desenvolvimento Local (Recomendado)**

```bash
# Opção 1: Apenas API + Prisma Studio
yarn dev

# Opção 2: API + PostgreSQL Docker + Migrações
yarn dev:docker

# Opção 3: Tudo junto (API + Prisma Studio + PostgreSQL Docker)
yarn dev:full
```

### **Comandos Individuais**

```bash
# Rodar apenas a API em modo watch
yarn start:dev

# Rodar apenas o Prisma Studio
yarn db:studio

# Gerar cliente Prisma
yarn db:generate

# Executar migrações
yarn db:migrate

# Resetar banco de dados
yarn db:reset

# Executar seed
yarn db:seed
```

### **Comandos Docker**

```bash
# Iniciar apenas PostgreSQL
yarn docker:postgres

# Parar PostgreSQL
yarn docker:postgres:stop

# Iniciar tudo com Docker
yarn docker:up

# Parar tudo
yarn docker:down

# Ver logs
yarn docker:logs

# Executar migrações no Docker
yarn docker:migrate
```

## 🌐 URLs de Desenvolvimento

- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555
- **PostgreSQL**: localhost:5432

## 🔄 Fluxo de Desenvolvimento

### **Primeira vez:**

```bash
# 1. Instalar dependências
yarn install

# 2. Configurar .env

# 3. Iniciar PostgreSQL
yarn docker:postgres

# 4. Gerar cliente Prisma
yarn db:generate

# 5. Executar migrações
yarn db:migrate

# 6. Iniciar desenvolvimento
yarn dev
```

### **Desenvolvimento diário:**

```bash
# Iniciar tudo de uma vez
yarn dev:docker
```

## 🛠️ Comandos Úteis

```bash
# Formatar código
yarn format

# Lint
yarn lint

# Testes
yarn test

# Testes em watch
yarn test:watch

# Build
yarn build
```

## 🐛 Debug

```bash
# Modo debug
yarn start:debug

# Testes em debug
yarn test:debug
```

## 📊 Monitoramento

```bash
# Ver logs da API
yarn docker:logs

# Ver logs específicos
docker-compose logs api
docker-compose logs postgres
```

## 🧹 Limpeza

```bash
# Limpar cache do Docker
yarn docker:clean

# Resetar banco
yarn db:reset

# Parar todos os containers
yarn docker:down
```

## ⚡ Dicas

1. **Hot Reload**: A API reinicia automaticamente quando você salva arquivos
2. **Prisma Studio**: Interface visual para o banco de dados
3. **Swagger**: Documentação interativa da API
4. **Logs**: Use `yarn docker:logs` para ver logs em tempo real

## 🚨 Troubleshooting

### **Porta já em uso:**

```bash
# Parar PostgreSQL local
yarn docker:postgres:stop

# Ou parar tudo
yarn docker:down
```

### **Erro de conexão com banco:**

```bash
# Verificar se PostgreSQL está rodando
docker ps

# Reiniciar PostgreSQL
yarn docker:postgres:stop
yarn docker:postgres
```

### **Erro de migração:**

```bash
# Resetar banco
yarn db:reset

# Ou no Docker
yarn docker:clean
yarn docker:up
yarn docker:migrate
```

## 📝 Estrutura do Projeto

```
versa-api/
├── src/
│   ├── application/          # Casos de uso e DTOs
│   ├── domain/              # Entidades e interfaces
│   ├── infrastructure/      # Implementações (banco, HTTP)
│   └── interfaces/          # Controllers
├── prisma/
│   ├── schema.prisma        # Schema do banco
│   └── seed.ts             # Dados iniciais
├── scripts/
│   └── docker.sh           # Scripts Docker
└── package.json            # Comandos de desenvolvimento
```

## 🔗 Links Úteis

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
