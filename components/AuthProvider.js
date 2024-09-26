'use client';
// Client side provider for authentification.
import { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, refreshAccessToken, getToken, shouldRefreshToken } from '../lib/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const initializeAuth = async () => { 
      if (token) {
        if (shouldRefreshToken(token)) {
          try {
            const userData = await refreshAccessToken();
            setUser(userData);
          } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
          }
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);
  const contextValue = {
    user,
    loading,
    login: async (username, password) => {
      setLoading(true);
      try {
        const userData = await login(username, password);
        setUser(userData);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    logout: () => {
      logout();
      setUser(null);
      setLoading(false);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);