import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../../../services/authService';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('Inicializando AuthContext...');
        // No establecer usuario automáticamente. Respetar sesión previa si existe.
        const existingToken = localStorage.getItem('auth_token');
        if (!existingToken) {
          // No hay sesión: marcar fin de carga para mostrar Login
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }

        // Con token previo: intentar recuperar usuario mock de forma segura
        // En entorno sin backend, no podemos validar el token, así que solo
        // finalizamos la carga para permitir que flujos controlados manejen el estado.
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        console.error('Error en AuthContext:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user, token } = await authService.login(credentials);
      localStorage.setItem('auth_token', token);
      dispatch({ type: 'SET_USER', payload: user });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user, token } = await authService.register(userData);
      localStorage.setItem('auth_token', token);
      dispatch({ type: 'SET_USER', payload: user });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
  };

  const hasRole = (role) => {
    return state.user?.roles?.includes(role) || false;
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};