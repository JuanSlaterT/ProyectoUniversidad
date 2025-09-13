export const authService = {
  login: async (credentials) => {
    // Simulación de API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login - acepta cualquier credencial
    const mockUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: credentials.email.split('@')[0] || 'Usuario',
      email: credentials.email,
      roles: ['student', 'teacher'], // Usuario con múltiples roles
      avatar: null,
    };
    
    const mockToken = `mock-jwt-token-${Date.now()}`;
    
    return {
      user: mockUser,
      token: mockToken,
    };
  },

  register: async (userData) => {
    // Simulación de API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    const mockUser = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      roles: [userData.role || 'student'],
      avatar: null,
    };
    
    const mockToken = `mock-jwt-token-${Date.now()}`;
    
    return {
      user: mockUser,
      token: mockToken,
    };
  },

  getCurrentUser: async () => {
    // Simulación de API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user data basado en el token almacenado
    const mockUser = {
      id: 1,
      name: 'Usuario Demo',
      email: 'demo@example.com',
      roles: ['student', 'teacher', 'admin'], // Usuario con todos los roles
      avatar: null,
    };
    
    return mockUser;
  },

  logout: async () => {
    // Simulación de API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
};