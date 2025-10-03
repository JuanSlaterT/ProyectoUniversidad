#!/bin/bash

# Script de despliegue para EduStreaming
# Uso: ./deploy.sh [dev|prod]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con color
print_message() {
    echo -e "${BLUE}[EduStreaming]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[EduStreaming]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[EduStreaming]${NC} $1"
}

print_error() {
    echo -e "${RED}[EduStreaming]${NC} $1"
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  dev     - Levantar aplicación en modo desarrollo"
    echo "  prod    - Levantar aplicación en modo producción"
    echo "  build   - Construir imagen de Docker"
    echo "  stop    - Detener contenedores"
    echo "  clean   - Limpiar contenedores e imágenes"
    echo "  logs    - Ver logs de la aplicación"
    echo "  health  - Verificar salud de la aplicación"
    echo "  help    - Mostrar esta ayuda"
}

# Función para verificar si Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker no está instalado. Por favor instala Docker primero."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
        exit 1
    fi
}

# Función para construir la imagen
build_image() {
    print_message "Construyendo imagen de Docker..."
    docker-compose build
    print_success "Imagen construida exitosamente"
}

# Función para levantar en modo desarrollo
start_dev() {
    print_message "Levantando aplicación en modo desarrollo..."
    docker-compose --profile dev up -d edustreaming-dev
    print_success "Aplicación de desarrollo levantada en http://localhost:5173"
    print_warning "Los cambios en el código se reflejarán automáticamente"
}

# Función para levantar en modo producción
start_prod() {
    print_message "Levantando aplicación en modo producción..."
    docker-compose up -d edustreaming
    print_success "Aplicación de producción levantada en http://localhost:3000"
}

# Función para detener contenedores
stop_containers() {
    print_message "Deteniendo contenedores..."
    docker-compose down
    print_success "Contenedores detenidos"
}

# Función para limpiar
clean_up() {
    print_message "Limpiando contenedores e imágenes..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    print_success "Limpieza completada"
}

# Función para ver logs
show_logs() {
    print_message "Mostrando logs de la aplicación..."
    docker-compose logs -f
}

# Función para verificar salud
check_health() {
    print_message "Verificando salud de la aplicación..."
    
    # Verificar si el contenedor está corriendo
    if docker-compose ps | grep -q "Up"; then
        print_success "Contenedor está corriendo"
        
        # Verificar endpoint de salud
        if curl -f http://localhost:3000/health &> /dev/null; then
            print_success "Aplicación responde correctamente"
        else
            print_warning "Aplicación no responde en el endpoint de salud"
        fi
    else
        print_error "Contenedor no está corriendo"
    fi
}

# Función principal
main() {
    check_docker

    case "${1:-help}" in
        "dev")
            build_image
            start_dev
            ;;
        "prod")
            build_image
            start_prod
            ;;
        "build")
            build_image
            ;;
        "stop")
            stop_containers
            ;;
        "clean")
            clean_up
            ;;
        "logs")
            show_logs
            ;;
        "health")
            check_health
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Ejecutar función principal
main "$@"
