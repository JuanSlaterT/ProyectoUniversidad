# 🐳 Docker Setup para EduStreaming

Este documento explica cómo desplegar la aplicación EduStreaming usando Docker.

## 📋 Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Al menos 2GB de RAM disponible
- Puerto 3000 y 5173 disponibles

## 🚀 Despliegue Rápido

### Opción 1: Usando Scripts (Recomendado)

#### En Windows:
```bash
# Modo desarrollo (con hot reload)
deploy.bat dev

# Modo producción
deploy.bat prod

# Ver logs
deploy.bat logs

# Detener aplicación
deploy.bat stop
```

#### En Linux/Mac:
```bash
# Hacer ejecutable el script
chmod +x deploy.sh

# Modo desarrollo (con hot reload)
./deploy.sh dev

# Modo producción
./deploy.sh prod

# Ver logs
./deploy.sh logs

# Detener aplicación
./deploy.sh stop
```

### Opción 2: Usando Docker Compose Directamente

#### Modo Desarrollo:
```bash
# Construir y levantar en modo desarrollo
docker-compose --profile dev up -d edustreaming-dev

# La aplicación estará disponible en: http://localhost:5173
```

#### Modo Producción:
```bash
# Construir y levantar en modo producción
docker-compose up -d edustreaming

# La aplicación estará disponible en: http://localhost:3000
```

## 🔧 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `dev` | Levanta la aplicación en modo desarrollo con hot reload |
| `prod` | Levanta la aplicación en modo producción optimizada |
| `build` | Solo construye la imagen de Docker |
| `stop` | Detiene todos los contenedores |
| `clean` | Limpia contenedores, imágenes y volúmenes |
| `logs` | Muestra los logs de la aplicación en tiempo real |
| `health` | Verifica el estado de salud de la aplicación |

## 📁 Estructura de Archivos Docker

```
├── Dockerfile              # Dockerfile para producción
├── Dockerfile.dev          # Dockerfile para desarrollo
├── docker-compose.yml      # Configuración de servicios
├── nginx.conf              # Configuración de Nginx
├── .dockerignore           # Archivos a ignorar en el build
├── deploy.sh               # Script de despliegue (Linux/Mac)
├── deploy.bat              # Script de despliegue (Windows)
└── DOCKER_README.md        # Este archivo
```

## 🌐 Acceso a la Aplicación

### Modo Desarrollo:
- **URL**: http://localhost:5173
- **Características**: Hot reload, debugging, herramientas de desarrollo

### Modo Producción:
- **URL**: http://localhost:3000
- **Características**: Optimizada, comprimida, lista para producción

## 🔍 Verificación de Salud

La aplicación incluye un endpoint de salud:

```bash
# Verificar salud
curl http://localhost:3000/health

# Respuesta esperada: "healthy"
```

## 🛠️ Configuración Avanzada

### Variables de Entorno

Puedes personalizar la configuración editando el archivo `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
```

### Configuración de Nginx

El archivo `nginx.conf` incluye:
- Compresión gzip
- Cache para archivos estáticos
- Configuración para SPA routing
- Headers de seguridad
- Optimizaciones de rendimiento

### Puertos Personalizados

Para cambiar los puertos, edita `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Cambiar 3000 por 8080
```

## 🐛 Solución de Problemas

### Problema: Puerto ya en uso
```bash
# Verificar qué está usando el puerto
netstat -tulpn | grep :3000

# Detener contenedores y limpiar
docker-compose down
docker system prune -f
```

### Problema: Error de permisos
```bash
# En Linux/Mac, dar permisos al script
chmod +x deploy.sh

# En Windows, ejecutar como administrador
```

### Problema: Imagen no se construye
```bash
# Limpiar cache de Docker
docker system prune -a

# Reconstruir sin cache
docker-compose build --no-cache
```

### Problema: Aplicación no responde
```bash
# Verificar logs
docker-compose logs

# Verificar estado de contenedores
docker-compose ps

# Reiniciar servicios
docker-compose restart
```

## 📊 Monitoreo

### Ver Logs en Tiempo Real
```bash
# Todos los servicios
docker-compose logs -f

# Solo la aplicación
docker-compose logs -f edustreaming
```

### Verificar Estado
```bash
# Estado de contenedores
docker-compose ps

# Uso de recursos
docker stats
```

## 🔒 Seguridad

La configuración incluye:
- Usuario no-root en el contenedor
- Headers de seguridad en Nginx
- Configuración CSP básica
- Validación de archivos estáticos

## 📈 Optimizaciones

### Para Producción:
- Compresión gzip habilitada
- Cache agresivo para archivos estáticos
- Optimización de imágenes
- Configuración de Nginx optimizada

### Para Desarrollo:
- Hot reload habilitado
- Volúmenes montados para cambios en tiempo real
- Herramientas de debugging disponibles

## 🚀 Despliegue en Producción

### 1. Preparar el Servidor
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Clonar y Desplegar
```bash
# Clonar repositorio
git clone <tu-repositorio>
cd edustreaming

# Desplegar en producción
./deploy.sh prod
```

### 3. Configurar Proxy Reverso (Opcional)
```nginx
# Ejemplo para Nginx como proxy reverso
server {
    listen 80;
    server_name tu-dominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📞 Soporte

Si encuentras problemas:

1. Verifica los logs: `docker-compose logs`
2. Revisa el estado: `docker-compose ps`
3. Limpia y reconstruye: `./deploy.sh clean && ./deploy.sh prod`
4. Verifica que los puertos estén disponibles

## 🎉 ¡Listo!

Tu aplicación EduStreaming debería estar funcionando correctamente. 

- **Desarrollo**: http://localhost:5173
- **Producción**: http://localhost:3000

¡Disfruta de tu aplicación! 🚀
