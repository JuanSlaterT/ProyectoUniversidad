// Servicio mockeado para chat
export const chatService = {
  // Conectar al chat de un stream
  connectToChat: async (streamId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      connectionId: `chat-${streamId}-${Date.now()}`,
      message: 'Conectado al chat'
    };
  },

  // Desconectar del chat
  disconnectFromChat: async (connectionId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      message: 'Desconectado del chat'
    };
  },

  // Enviar mensaje
  sendMessage: async (streamId, message, userId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
      success: true,
      messageId: Date.now(),
      timestamp: new Date().toISOString(),
      message: 'Mensaje enviado correctamente'
    };
  },

  // Obtener mensajes del chat
  getChatMessages: async (streamId, limit = 50) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const mockMessages = [
      {
        id: 1,
        user: 'María González',
        userId: 'user-1',
        message: '¡Excelente clase! Muy clara la explicación de las variables',
        timestamp: '14:25:30',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 2,
        user: 'Carlos Ruiz',
        userId: 'user-2',
        message: '¿Podrías repetir la parte de los tipos de datos?',
        timestamp: '14:26:15',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 3,
        user: 'Elena Silva',
        userId: 'user-3',
        message: '¿Cuál es la diferencia entre listas y tuplas?',
        timestamp: '14:27:45',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 4,
        user: 'Prof. Ana Martínez',
        userId: 'teacher-1',
        message: 'Las listas son mutables y las tuplas inmutables. Te explico con un ejemplo...',
        timestamp: '14:28:20',
        isModerator: true,
        isTeacher: true,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 5,
        user: 'Luis García',
        userId: 'user-4',
        message: '¿Podemos ver un ejemplo práctico?',
        timestamp: '14:29:10',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 6,
        user: 'Sofia Torres',
        userId: 'user-5',
        message: '¡Muy interesante! ¿Hay ejercicios para practicar?',
        timestamp: '14:30:05',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 7,
        user: 'Prof. Ana Martínez',
        userId: 'teacher-1',
        message: 'Sí, al final de la clase les daré ejercicios para practicar en casa',
        timestamp: '14:30:45',
        isModerator: true,
        isTeacher: true,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      {
        id: 8,
        user: 'Diego López',
        userId: 'user-6',
        message: '¿Podrías explicar los diccionarios también?',
        timestamp: '14:31:20',
        isModerator: false,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
    ];
    
    return mockMessages.slice(0, limit);
  },

  // Suscribirse a nuevos mensajes (simulado)
  subscribeToMessages: (streamId, callback) => {
    // Simular mensajes en tiempo real
    const interval = setInterval(() => {
      const randomMessages = [
        '¡Muy interesante!',
        '¿Podrías explicar más sobre esto?',
        'Excelente explicación',
        'Gracias profesor',
        '¿Hay tarea para la próxima clase?',
        'Muy clara la explicación',
        '¿Podrías repetir el último ejemplo?'
      ];
      
      const randomUser = ['Ana', 'Carlos', 'María', 'Luis', 'Sofia', 'Diego', 'Elena'][Math.floor(Math.random() * 7)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      const newMessage = {
        id: Date.now(),
        user: randomUser,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        message: randomMessage,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isModerator: Math.random() > 0.9
      };
      
      callback(newMessage);
    }, 5000 + Math.random() * 10000); // Entre 5-15 segundos
    
    return () => clearInterval(interval);
  }
}; 