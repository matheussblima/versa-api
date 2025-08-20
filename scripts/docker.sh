#!/bin/bash

# Script para facilitar o uso do Docker com a aplicação versa-api

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Função para mostrar ajuda
show_help() {
    echo "Uso: ./scripts/docker.sh [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  build     - Construir as imagens Docker"
    echo "  up        - Iniciar todos os serviços"
    echo "  down      - Parar todos os serviços"
    echo "  restart   - Reiniciar todos os serviços"
    echo "  logs      - Mostrar logs dos containers"
    echo "  clean     - Remover containers, volumes e imagens"
    echo "  migrate   - Executar migrações do banco de dados"
    echo "  seed      - Executar seed do banco de dados"
    echo "  studio    - Iniciar Prisma Studio"
    echo "  shell     - Acessar shell do container da API"
    echo "  help      - Mostrar esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  ./scripts/docker.sh build"
    echo "  ./scripts/docker.sh up"
    echo "  ./scripts/docker.sh logs"
}

# Função para construir as imagens
build() {
    print_header "Construindo imagens Docker"
    docker-compose build
    print_message "Imagens construídas com sucesso!"
}

# Função para iniciar os serviços
up() {
    print_header "Iniciando serviços"
    docker-compose up -d
    print_message "Serviços iniciados!"
    print_message "API disponível em: http://localhost:3000"
    print_message "PostgreSQL disponível em: localhost:5432"
}

# Função para parar os serviços
down() {
    print_header "Parando serviços"
    docker-compose down
    print_message "Serviços parados!"
}

# Função para reiniciar os serviços
restart() {
    print_header "Reiniciando serviços"
    docker-compose restart
    print_message "Serviços reiniciados!"
}

# Função para mostrar logs
logs() {
    print_header "Logs dos containers"
    docker-compose logs -f
}

# Função para limpar tudo
clean() {
    print_warning "Esta ação irá remover todos os containers, volumes e imagens!"
    read -p "Tem certeza? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_header "Limpando containers, volumes e imagens"
        docker-compose down -v --rmi all
        docker system prune -f
        print_message "Limpeza concluída!"
    else
        print_message "Operação cancelada."
    fi
}

# Função para executar migrações
migrate() {
    print_header "Executando migrações do banco de dados"
    docker-compose exec api yarn db:migrate
    print_message "Migrações executadas com sucesso!"
}

# Função para executar seed
seed() {
    print_header "Executando seed do banco de dados"
    docker-compose exec api yarn db:seed
    print_message "Seed executado com sucesso!"
}

# Função para iniciar Prisma Studio
studio() {
    print_header "Iniciando Prisma Studio"
    docker-compose --profile dev up prisma-studio -d
    print_message "Prisma Studio disponível em: http://localhost:5555"
}

# Função para acessar shell do container
shell() {
    print_header "Acessando shell do container da API"
    docker-compose exec api sh
}

# Verificar se o comando foi fornecido
if [ $# -eq 0 ]; then
    print_error "Nenhum comando fornecido!"
    show_help
    exit 1
fi

# Executar comando baseado no argumento
case $1 in
    build)
        build
        ;;
    up)
        up
        ;;
    down)
        down
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    clean)
        clean
        ;;
    migrate)
        migrate
        ;;
    seed)
        seed
        ;;
    studio)
        studio
        ;;
    shell)
        shell
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Comando desconhecido: $1"
        show_help
        exit 1
        ;;
esac
