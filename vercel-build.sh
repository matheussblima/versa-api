#!/bin/bash

set -e

echo "🚀 Iniciando build para Vercel..."

# Verificar se as variáveis de ambiente estão configuradas
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL não está configurada"
    exit 1
fi

echo "✅ Variáveis de ambiente configuradas"

# Gerar cliente Prisma
echo "🔧 Gerando cliente Prisma..."
npx prisma generate

# Executar migrações em produção
echo "🗄️ Executando migrações do banco de dados..."
npx prisma migrate deploy

# Compilar o seed
echo "📦 Compilando seed..."
npx tsc --project tsconfig.seed.json

# Executar o seed
echo "🌱 Executando seed do banco de dados..."
node dist/prisma/seed.js

# Build da aplicação
echo "🏗️ Build da aplicação..."
npx nest build

echo "✅ Build concluído com sucesso!"
