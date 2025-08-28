# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependências
RUN num install --frozen-lockfile

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN yarn db:generate

# Build da aplicação
RUN yarn build

# Verificar se o arquivo foi gerado
RUN ls -la dist/

# Estágio de produção
FROM node:18-alpine AS production

WORKDIR /app

# Instalar apenas dependências de produção
COPY package*.json ./
COPY yarn.lock ./
RUN npm install --frozen-lockfile --production

# Copiar arquivos buildados e necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Verificar se o arquivo existe
RUN ls -la dist/

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Mudar propriedade dos arquivos
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expor porta
EXPOSE 3000

# Comando para executar a aplicação
CMD ["node", "dist/src/main.js"]
