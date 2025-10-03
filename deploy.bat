@echo off
REM Script de despliegue para EduStreaming en Windows
REM Uso: deploy.bat [dev|prod]

setlocal enabledelayedexpansion

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [EduStreaming] Error: Docker no está instalado. Por favor instala Docker Desktop primero.
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [EduStreaming] Error: Docker Compose no está instalado. Por favor instala Docker Compose primero.
    exit /b 1
)

if "%1"=="dev" (
    echo [EduStreaming] Construyendo imagen de Docker...
    docker-compose build
    if %errorlevel% neq 0 (
        echo [EduStreaming] Error al construir la imagen
        exit /b 1
    )
    echo [EduStreaming] Levantando aplicación en modo desarrollo...
    docker-compose --profile dev up -d edustreaming-dev
    echo [EduStreaming] Aplicación de desarrollo levantada en http://localhost:5173
    echo [EduStreaming] Los cambios en el código se reflejarán automáticamente
) else if "%1"=="prod" (
    echo [EduStreaming] Construyendo imagen de Docker...
    docker-compose build
    if %errorlevel% neq 0 (
        echo [EduStreaming] Error al construir la imagen
        exit /b 1
    )
    echo [EduStreaming] Levantando aplicación en modo producción...
    docker-compose up -d edustreaming
    echo [EduStreaming] Aplicación de producción levantada en http://localhost:3000
) else if "%1"=="build" (
    echo [EduStreaming] Construyendo imagen de Docker...
    docker-compose build
    echo [EduStreaming] Imagen construida exitosamente
) else if "%1"=="stop" (
    echo [EduStreaming] Deteniendo contenedores...
    docker-compose down
    echo [EduStreaming] Contenedores detenidos
) else if "%1"=="clean" (
    echo [EduStreaming] Limpiando contenedores e imágenes...
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo [EduStreaming] Limpieza completada
) else if "%1"=="logs" (
    echo [EduStreaming] Mostrando logs de la aplicación...
    docker-compose logs -f
) else if "%1"=="health" (
    echo [EduStreaming] Verificando salud de la aplicación...
    docker-compose ps
    curl -f http://localhost:3000/health >nul 2>&1
    if %errorlevel% equ 0 (
        echo [EduStreaming] Aplicación responde correctamente
    ) else (
        echo [EduStreaming] Aplicación no responde en el endpoint de salud
    )
) else (
    echo Uso: %0 [comando]
    echo.
    echo Comandos disponibles:
    echo   dev     - Levantar aplicación en modo desarrollo
    echo   prod    - Levantar aplicación en modo producción
    echo   build   - Construir imagen de Docker
    echo   stop    - Detener contenedores
    echo   clean   - Limpiar contenedores e imágenes
    echo   logs    - Ver logs de la aplicación
    echo   health  - Verificar salud de la aplicación
    echo   help    - Mostrar esta ayuda
)

endlocal
