# 🎓 EduStreaming - Plataforma de Educación en Vivo

Una plataforma moderna de streaming educativo que permite a profesores transmitir clases en vivo y a estudiantes acceder a contenido educativo de alta calidad.

## ✨ Características Principales

### �� Streaming en Vivo
- Transmisión de clases en tiempo real
- Múltiples calidades de video (360p, 720p, 1080p)
- Calidad adaptativa basada en la conexión del usuario
- Controles de reproducción avanzados

### 💬 Chat Interactivo
- Chat en tiempo real durante las transmisiones
- Moderación de mensajes
- Notificaciones de nuevos mensajes
- Historial de conversaciones

### 📚 Gestión de Contenido
- Clases en vivo y grabadas
- Categorización por materias
- Sistema de calificaciones
- Búsqueda y filtrado de contenido

### 👥 Gestión de Usuarios
- Sistema de autenticación completo
- Roles: Estudiante, Profesor, Administrador
- Perfiles de usuario personalizables
- Dashboard administrativo

### �� Analytics y Reportes
- Estadísticas de visualizaciones
- Métricas de engagement
- Reportes de actividad
- Dashboard de administración

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **Material-UI (MUI)** - Componentes de interfaz
- **Styled Components** - Estilos CSS-in-JS
- **React Router** - Navegación
- **React Query** - Gestión de estado del servidor
- **Framer Motion** - Animaciones

### Streaming y Multimedia
- **Video.js** - Reproductor de video
- **HLS.js** - Streaming de video
- **Socket.io Client** - Comunicación en tiempo real

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd edu-streaming
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
cp .env.example .env.local
```

4. **Iniciar el servidor de desarrollo**
```bash
npm start
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

##  Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo
npm run dev        # Alias para npm start

# Producción
npm run build      # Construye la aplicación para producción
npm run preview    # Vista previa de la build de producción

# Testing
npm test           # Ejecuta las pruebas
npm run test:coverage # Ejecuta pruebas con cobertura

# Linting
npm run lint       # Ejecuta ESLint
npm run lint:fix   # Ejecuta ESLint y corrige errores automáticamente
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Configuración principal de la app
│   ├── App.js             # Componente principal
│   └── components/        # Componentes compartidos de la app
├── assets/                # Recursos estáticos
│   ├── images/           # Imágenes
│   └── styles/           # Estilos globales
├── config/               # Configuración
│   ├── env.js           # Variables de entorno
│   └── theme.js         # Tema de Material-UI
├── features/             # Funcionalidades específicas
│   └── notifications/    # Sistema de notificaciones
├── modules/              # Módulos principales
│   ├── admin/           # Panel de administración
│   ├── auth/            # Autenticación
│   ├── catalog/         # Catálogo de contenido
│   ├── classroom/       # Aula virtual
│   ├── live/            # Streaming en vivo
│   └── player/          # Reproductor de video
├── services/             # Servicios y APIs
│   ├── authService.js   # Servicio de autenticación
│   ├── streamingService.js # Servicio de streaming
│   ├── chatService.js   # Servicio de chat
│   ├── analyticsService.js # Servicio de analytics
│   ├── userService.js   # Servicio de usuarios
│   ├── notificationService.js # Servicio de notificaciones
│   └── index.js         # Exportaciones principales
├── shared/               # Componentes compartidos
│   └── components/      # Componentes reutilizables
└── index.js             # Punto de entrada
```

##  Funcionalidades por Módulo

### 🔐 Módulo de Autenticación
- Login con cualquier credencial (modo demo)
- Registro de usuarios
- Gestión de sesiones
- Roles y permisos

### 🏠 Módulo de Catálogo
- Lista de streams en vivo
- Clases grabadas
- Filtros por categoría
- Búsqueda de contenido

### 📺 Módulo de Streaming
- Reproductor de video
- Chat en tiempo real
- Controles de calidad
- Pantalla completa

### 👨‍ Módulo de Administración
- Dashboard con estadísticas
- Gestión de usuarios
- Configuración de streams
- Reportes de actividad

###  Módulo de Aula Virtual
- Interfaz de clase
- Herramientas de enseñanza
- Recursos compartidos

## 🔧 Configuración

### Variables de Entorno

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WS_URL=ws://localhost:8080
REACT_APP_STREAMING_URL=http://localhost:8080/stream

# WebRTC Configuration
REACT_APP_STUN_SERVER=stun:stun.l.google.com:19302
REACT_APP_TURN_SERVER=your-turn-server
REACT_APP_TURN_USERNAME=your-username
REACT_APP_TURN_PASSWORD=your-password

# Social Media
REACT_APP_FACEBOOK_APP_ID=your-facebook-app-id
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your-instagram-token

# Features
REACT_APP_ENABLE_CHAT=true
REACT_APP_ENABLE_RECORDING=true
REACT_APP_ENABLE_ANALYTICS=true

# Streaming
REACT_APP_MAX_BITRATE=5000
REACT_APP_MIN_BITRATE=500
```

##  Personalización

### Tema
El proyecto usa Material-UI con un tema personalizado. Puedes modificar los colores y estilos en `src/config/theme.js`.

### Colores Principales
- **Verde Principal**: #4CAF50
- **Verde Secundario**: #66BB6A
- **Rojo (Live)**: #F44336
- **Azul (Info)**: #2196F3

##  Despliegue

### Build para Producción
```bash
npm run build
```

### Despliegue en Netlify
1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno
3. El build se ejecutará automáticamente

### Despliegue en Vercel
1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

##  Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## 📝 Modo Demo

Este proyecto incluye un **modo demo completo** que funciona sin backend:

- ✅ **Autenticación**: Login con cualquier credencial
- ✅ **Datos Mockeados**: Todos los servicios están mockeados
- ✅ **Funcionalidades Completas**: Chat, streaming, analytics
- ✅ **Sin Dependencias Externas**: Funciona completamente offline

### Credenciales de Demo
- **Email**: Cualquier email válido
- **Contraseña**: Cualquier contraseña

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Material-UI por los componentes
- React Query por la gestión de estado
- Socket.io por la comunicación en tiempo real
- Video.js por el reproductor de video¡

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
