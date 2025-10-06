// Servicio mockeado para streaming
import { STREAMS } from "../data/streams";
export const streamingService = {
  // Obtener streams en vivo
  getLiveStreams: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        title: 'Matemáticas Avanzadas - Cálculo Integral',
        teacher: 'Prof. María González',
        viewers: 245,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Matemáticas',
        duration: '2:30:00',
        rating: 4.8,
        startTime: '14:00',
        description: 'En esta clase revisaremos los conceptos fundamentales del cálculo integral, incluyendo integrales definidas e indefinidas, métodos de integración y aplicaciones prácticas.',
        streamUrl: 'mock-stream-url-1',
        quality: ['360p', '720p', '1080p'],
        level: 'Avanzado',
        price: 0,
        language: 'Español',
        tags: ['matemáticas', 'cálculo', 'integrales', 'avanzado']
      },
      {
        id: 2,
        title: 'Historia Universal - Segunda Guerra Mundial',
        teacher: 'Prof. Carlos Ruiz',
        viewers: 189,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Historia',
        duration: '1:45:00',
        rating: 4.6,
        startTime: '15:30',
        description: 'Análisis detallado de los eventos de la Segunda Guerra Mundial, causas, consecuencias y impacto en el mundo moderno.',
        streamUrl: 'mock-stream-url-2',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 0,
        language: 'Español',
        tags: ['historia', 'guerra mundial', 'política', 'sociedad']
      },
      {
        id: 3,
        title: 'Programación en Python - Fundamentos',
        teacher: 'Prof. Ana Martínez',
        viewers: 156,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Programación',
        duration: '3:00:00',
        rating: 4.9,
        startTime: '16:00',
        description: 'Aprende los fundamentos de Python desde cero. Variables, tipos de datos, estructuras de control y funciones.',
        streamUrl: 'mock-stream-url-3',
        quality: ['360p', '720p', '1080p'],
        level: 'Principiante',
        price: 0,
        language: 'Español',
        tags: ['python', 'programación', 'básico', 'fundamentos']
      },
      {
        id: 4,
        title: 'JavaScript Avanzado - ES6+',
        teacher: 'Prof. Luis García',
        viewers: 98,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Desarrollo Web',
        duration: '2:45:00',
        rating: 4.7,
        startTime: '17:30',
        description: 'Domina las características modernas de JavaScript. Arrow functions, destructuring, async/await y más.',
        streamUrl: 'mock-stream-url-4',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 29.99,
        language: 'Español',
        tags: ['javascript', 'es6', 'avanzado', 'web']
      },
      {
        id: 5,
        title: 'React Hooks y Context API',
        teacher: 'Prof. Elena Rodríguez',
        viewers: 203,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Frontend',
        duration: '2:30:00',
        rating: 4.8,
        startTime: '19:00',
        description: 'Aprende a usar hooks y context en React para manejar estado de manera eficiente.',
        streamUrl: 'mock-stream-url-5',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 39.99,
        language: 'Español',
        tags: ['react', 'hooks', 'context', 'frontend']
      },
      {
        id: 6,
        title: 'Node.js y Express - Backend Development',
        teacher: 'Prof. Miguel Torres',
        viewers: 67,
        isLive: true,
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Backend',
        duration: '4:00:00',
        rating: 4.6,
        startTime: '20:30',
        description: 'Construye APIs robustas con Node.js y Express. Incluye autenticación, base de datos y deployment.',
        streamUrl: 'mock-stream-url-6',
        quality: ['360p', '720p', '1080p'],
        level: 'Avanzado',
        price: 49.99,
        language: 'Español',
        tags: ['nodejs', 'express', 'api', 'backend']
      }
    ];
  },

  // Obtener streams grabados
  getRecordedStreams: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 7,
        title: 'Programación en Python - Estructuras de Datos',
        teacher: 'Prof. Ana Martínez',
        viewers: 342,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Programación',
        duration: '3:15:00',
        rating: 4.9,
        uploadDate: '2024-01-15',
        description: 'Curso completo sobre estructuras de datos en Python, incluyendo listas, tuplas, diccionarios, conjuntos y algoritmos de ordenamiento.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 29.99,
        language: 'Español',
        tags: ['python', 'estructuras-datos', 'algoritmos', 'programación']
      },
      {
        id: 8,
        title: 'Física Cuántica - Principios Fundamentales',
        teacher: 'Prof. Roberto Silva',
        viewers: 156,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Física',
        duration: '2:00:00',
        rating: 4.7,
        uploadDate: '2024-01-10',
        description: 'Introducción a los principios de la física cuántica, incluyendo dualidad onda-partícula y principio de incertidumbre.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Avanzado',
        price: 79.99,
        language: 'Español',
        tags: ['física', 'cuántica', 'ciencia', 'avanzado']
      },
      {
        id: 9,
        title: 'React Hooks y Context API',
        teacher: 'Prof. Elena Rodríguez',
        viewers: 278,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Frontend',
        duration: '2:45:00',
        rating: 4.8,
        uploadDate: '2024-01-12',
        description: 'Aprende a usar hooks y context en React para manejar estado de manera eficiente y crear componentes reutilizables.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 39.99,
        language: 'Español',
        tags: ['react', 'hooks', 'context', 'frontend']
      },
      {
        id: 10,
        title: 'Node.js y Express - Backend Development',
        teacher: 'Prof. Miguel Torres',
        viewers: 189,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Backend',
        duration: '4:20:00',
        rating: 4.6,
        uploadDate: '2024-01-08',
        description: 'Desarrollo de APIs robustas con Node.js y Express. Incluye autenticación, middleware, base de datos y deployment.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Avanzado',
        price: 49.99,
        language: 'Español',
        tags: ['nodejs', 'express', 'api', 'backend']
      },
      {
        id: 11,
        title: 'Machine Learning con Python',
        teacher: 'Prof. Carlos Ruiz',
        viewers: 156,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Data Science',
        duration: '5:30:00',
        rating: 4.5,
        uploadDate: '2024-01-05',
        description: 'Introducción al machine learning usando scikit-learn y pandas. Algoritmos de clasificación, regresión y clustering.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Intermedio',
        price: 59.99,
        language: 'Español',
        tags: ['python', 'machine-learning', 'scikit-learn', 'data-science']
      },
      {
        id: 12,
        title: 'Docker y Kubernetes para Desarrolladores',
        teacher: 'Prof. Sofia Martínez',
        viewers: 98,
        isLive: false,
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'DevOps',
        duration: '4:45:00',
        rating: 4.8,
        uploadDate: '2024-01-03',
        description: 'Aprende containerización y orquestación de aplicaciones con Docker y Kubernetes para deployment profesional.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        quality: ['360p', '720p', '1080p'],
        level: 'Avanzado',
        price: 69.99,
        language: 'Español',
        tags: ['docker', 'kubernetes', 'devops', 'containers']
      }
    ];
  },

  // Obtener detalles de un stream específico
  getStreamDetails: async (streamId) => {
    await new Promise((r) => setTimeout(r, 300)); // simula red
    const id = Number(streamId);
    const keys = Object.keys(STREAMS).map(Number);
    const pick =
      STREAMS[id] ?? STREAMS[keys[(id - 1) % keys.length]];

    // Determinar protocolo basado en el streamId
    const protocol = streamId === 'webrtc-1' || streamId === 'webrtc-2' ? 'webrtc' : 'hls';

    return {
      ...pick,
      protocol: protocol,
      hlsUrl: protocol === 'hls' ? `https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8` : null,
      webrtcStream: protocol === 'webrtc' ? null : null, // Se establecerá dinámicamente
      quality: ["360p", "720p", "1080p"],
      chatEnabled: true,
      recordingEnabled: true,
      interactiveFeatures: {
        polls: true,
        qa: true,
        handRaise: true,
        breakoutRooms: false
      }
    };
  },

  // Iniciar stream
  startStream: async (streamData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      streamId: Math.floor(Math.random() * 1000) + 1,
      streamUrl: `mock-stream-url-${Date.now()}`,
      message: 'Stream iniciado correctamente'
    };
  },

  // Detener stream
  stopStream: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Stream detenido correctamente'
    };
  },

  // Obtener detalles de un video específico
  getVideoDetails: async (videoId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockVideo = {
      id: parseInt(videoId),
      title: 'Programación en Python - Estructuras de Datos',
      teacher: 'Prof. Ana Martínez',
      description: 'Curso completo sobre estructuras de datos en Python, incluyendo listas, tuplas, diccionarios, conjuntos y algoritmos de ordenamiento.',
      category: 'Programación',
      uploadDate: '2024-01-15',
      views: 15420,
      likes: 234,
      dislikes: 12,
      duration: '3:15:00',
      thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      quality: ['360p', '720p', '1080p'],
      comments: [
        {
          id: 1,
          user: 'María González',
          avatar: null,
          text: 'Excelente explicación de las listas enlazadas. Muy clara la implementación.',
          timestamp: '2024-01-16T10:30:00Z',
          likes: 5
        },
        {
          id: 2,
          user: 'Carlos Ruiz',
          avatar: null,
          text: '¿Podrías hacer un video sobre algoritmos de búsqueda?',
          timestamp: '2024-01-16T14:22:00Z',
          likes: 2
        },
        {
          id: 3,
          user: 'Ana Silva',
          avatar: null,
          text: 'Muy útil para mi proyecto de fin de carrera. ¡Gracias!',
          timestamp: '2024-01-17T09:15:00Z',
          likes: 8
        }
      ],
      playlist: [
        {
          id: 1,
          title: 'Introducción a Python',
          teacher: 'Prof. Ana Martínez',
          duration: '2:30:00',
          thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
          isWatched: true
        },
        {
          id: 2,
          title: 'Variables y Tipos de Datos',
          teacher: 'Prof. Ana Martínez',
          duration: '1:45:00',
          thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
          isWatched: true
        },
        {
          id: 3,
          title: 'Estructuras de Datos',
          teacher: 'Prof. Ana Martínez',
          duration: '3:15:00',
          thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
          isWatched: false
        },
        {
          id: 4,
          title: 'Algoritmos de Ordenamiento',
          teacher: 'Prof. Ana Martínez',
          duration: '2:50:00',
          thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
          isWatched: false
        },
        {
          id: 5,
          title: 'Proyecto Final',
          teacher: 'Prof. Ana Martínez',
          duration: '4:20:00',
          thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
          isWatched: false
        }
      ]
    };
    
    return mockVideo;
  },

  // Obtener más videos relacionados
  getRelatedVideos: async (videoId, limit = 6) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const relatedVideos = [
      {
        id: 6,
        title: 'JavaScript Avanzado - ES6+',
        teacher: 'Prof. Luis García',
        duration: '4:10:00',
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 8920,
        rating: 4.7
      },
      {
        id: 7,
        title: 'React Hooks y Context API',
        teacher: 'Prof. Elena Rodríguez',
        duration: '3:45:00',
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 12300,
        rating: 4.9
      },
      {
        id: 8,
        title: 'Node.js y Express',
        teacher: 'Prof. Miguel Torres',
        duration: '5:20:00',
        thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        views: 6780,
        rating: 4.6
      }
    ];
    
    return relatedVideos.slice(0, limit);
  }
}; 