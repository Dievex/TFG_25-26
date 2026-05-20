import React, { createContext, useState, useContext } from 'react';
import api, { setToken } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, usuario } = response.data;
      
      setToken(token);
      setUser({ ...usuario, token });
      
      return usuario; // Para redirigir en el componente
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  const loginOperarioDirecto = async () => {
    // Según instrucciones, un acceso rápido para Operario
    // Aquí idealmente haríamos una llamada a un endpoint específico o usaríamos
    // credenciales genéricas de planta. Como ejemplo, usamos unas fijas.
    return login('operario@maflow.com', '123456');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginOperarioDirecto, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
