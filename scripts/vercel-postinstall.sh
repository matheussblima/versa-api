#!/bin/bash

# Verifica se está rodando no Vercel
if [ "$VERCEL" = "1" ] || [ "$VERCEL_ENV" = "production" ] || [ "$VERCEL_ENV" = "preview" ]; then
    echo "🔄 Executando build no Vercel..."
    npm run build:vercel
else
    echo "⏭️  Pulando build (não está no Vercel)"
fi
