import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('travelwise_token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const logout = useCallback(() => {
    localStorage.removeItem('travelwise_token');
    localStorage.removeItem('travelwise_user');
    setToken(null);
    setUser(null);
    setAuthError('');
  }, []);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    setAuthError('');
    if (!localStorage.getItem('travelwise_token')) {
      setToken(null);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await authApi.getMe();
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        console.error('Could not restore the current session:', err);
        setAuthError('TravelWise could not verify your session. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

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
    setAuthError('');
    return loggedUser;
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    const { access_token, user: newUser } = res.data;
    localStorage.setItem('travelwise_token', access_token);
    setToken(access_token);
    setUser(newUser);
    setAuthError('');
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
        authError,
        login,
        register,
        logout,
        refreshSession,
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
