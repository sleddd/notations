'use client';
// Client side provider for authentification.
import { createContext, useContext, useState, useEffect } from 'react';
import { login, logout, isAuthenticated } from '../lib/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser({ isLoggedIn: true });
    }
  }, []);

  const contextValue = {
    user,
    login: async (username, password) => {
      const userData = await login(username, password);
      setUser(userData);
    },
    logout: () => {
      logout();
      setUser(null);
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