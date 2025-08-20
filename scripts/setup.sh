#!/bin/bash

echo "🚀 Configurando o projeto Versa API..."

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp config.example.env .env
    echo "✅ Arquivo .env criado. Configure a URL do banco de dados."
else
    echo "✅ Arquivo .env já existe."
fi

# Instalar dependências
echo "📦 Instalando dependências..."
yarn install

# Gerar cliente Prisma
echo "🔧 Gerando cliente Prisma..."
npx prisma generate

# Executar migrações e seed
echo "🗄️ Executando migrações do banco de dados..."
npx prisma migrate dev

echo "🌱 Executando seed do banco de dados..."
yarn db:seed

echo "✅ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Execute: yarn start:dev"
echo ""
echo "🌐 A API estará disponível em: http://localhost:3000"
echo "📚 Documentação Swagger em: http://localhost:3000/api"
