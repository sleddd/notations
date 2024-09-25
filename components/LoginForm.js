'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {!user ? <>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          autoComplete="true"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="true"
          required
        />
        <button type="submit">Login</button>
      </>
        : <button type="submit" onClick={handleLogout}>Logout</button>}

    </form>
  );
};