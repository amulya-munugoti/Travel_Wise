import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('travelwise_token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('travelwise_token');
    localStorage.removeItem('travelwise_user');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      if (localStorage.getItem('travelwise_token')) {
        try {
          const res = await authApi.getMe();
          setUser(res.data);
        } catch (err) {
          if (err.response?.status !== 401) {
            console.error('Could not restore the current session:', err);
          }
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [logout]);

  useEffect(() => {
    window.addEventListener('travelwise:unauthorized', logout);
    return () => window.removeEventListener('travelwise:unauthorized', logout);
  }, [logout]);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const { access_token, user: loggedUser } = res.data;
    localStorage.setItem('travelwise_token', access_token);
    setToken(access_token);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    const { access_token, user: newUser } = res.data;
    localStorage.setItem('travelwise_token', access_token);
    setToken(access_token);
    setUser(newUser);
    return newUser;
  };

  const updateProfile = async (data) => {
    const res = await authApi.updateProfile(data);
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
