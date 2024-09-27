'use client';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getTimeOfDay } from '@/lib/calendar';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, user, loading } = useAuth();
  const timeOfDay = getTimeOfDay();
 

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
    <>{ ! loading ? 
    <form 
      id="login-form" 
      onSubmit={handleSubmit}
      className={ user ? 'logged-in' : 'logged-out'}
     >
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
        <button className="login" type="submit">Login</button>
      </>
        :
        <>
          <p className="italic font-light">Good {timeOfDay} {user.name}...</p> | <button className="logout text-xs uppercase opacity-80" type="submit" onClick={handleLogout}>Logout</button>
        </>
      }
    </form>
    : ''}</>
  );
};