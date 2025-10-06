// Chat mock con memoria + pub/sub
const store = new Map();            // streamId -> ChatMsg[]
const subs  = new Map();            // streamId -> Set(callback)

const wait = (ms) => new Promise(r => setTimeout(r, ms));

function ensureStream(streamId) {
  const id = Number(streamId);
  if (!store.has(id)) {
    store.set(id, [
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
    ]);
  }
  if (!subs.has(id)) subs.set(id, new Set());
  return id;
}

function broadcast(streamId, msg) {
  const set = subs.get(streamId);
  if (!set) return;
  for (const cb of set) cb(msg);
}

export const chatService = {
  // Conectar (simulado)
  connectToChat: async (streamId) => {
    const id = ensureStream(streamId);
    await wait(300);
    return {
      success: true,
      connectionId: `chat-${id}-${Date.now()}`,
      message: 'Conectado al chat'
    };
  },

  // Desconectar (simulado)
  disconnectFromChat: async (_connectionId) => {
    await wait(200);
    return { success: true, message: 'Desconectado del chat' };
  },

  // Enviar mensaje -> guarda y notifica suscriptores
  // Nota: puedes pasar 4to parámetro opcional userName para mostrar distinto del userId
  sendMessage: async (streamId, text, userId = 'current-user', userName) => {
    const id = ensureStream(streamId);
    await wait(100);

    const now = new Date();
    const msg = {
      id: Date.now(),
      user: userName || userId || 'Usuario',
      userId: userId || 'anon',
      message: text,
      timestamp: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isModerator: false,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName || userId || 'U')}`,
    };

    store.get(id).push(msg);
    broadcast(id, msg);
    return msg; // por si quieres loguear/telemetría
  },

  // Obtener histórico
  getChatMessages: async (streamId, limit = 50) => {
    const id = ensureStream(streamId);
    await wait(200);
    const arr = store.get(id);
    return arr.slice(-limit);
  },

  // Suscripción a nuevos mensajes
  subscribeToMessages: (streamId, callback) => {
    const id = ensureStream(streamId);
    subs.get(id).add(callback);

    // Bot simulador (5–15s)
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
      const users = ['Ana', 'Carlos', 'María', 'Luis', 'Sofia', 'Diego', 'Elena'];
      const user = users[Math.floor(Math.random() * users.length)];
      const bot = {
        id: Date.now(),
        user,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        isModerator: Math.random() > 0.9,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user)}`,
      };
      store.get(id).push(bot);
      callback(bot);
    }, 5000 + Math.random() * 10000);

    // Unsubscribe
    return () => {
      subs.get(id)?.delete(callback);
      clearInterval(interval);
    };
  }
};