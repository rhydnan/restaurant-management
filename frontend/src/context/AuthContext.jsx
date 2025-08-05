import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check for existing token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  // Login helper
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  // Registration helper with error logging
  const register = async form => {
    try {
      const { data } = await api.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      // Log the exact 400 response from your server
      console.error('Registration failed:', err.response?.data);
      // Re-throw so the calling component can display the error
      throw err;
    }
  };

  // Logout helper
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
