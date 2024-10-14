'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { LOGOUT } from '@/graphql/mutations';


export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(null);
  const [logout] = useMutation(LOGOUT);
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    if (result.error) {
      setSignInError(result.error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut();
    await logout();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        id="login-form"
        onSubmit={handleSubmit}
        className={session ? 'logged-in' : 'logged-out'}
      >
        {!session ? (
          <>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <button className="login" type="submit">Login</button>
          </>
        ) : (
          <>
            <button className="logout text-xs uppercase opacity-80" type="button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </form>
      {signInError && <p className="error">Unable to sign-in.</p>}
    </>
  );
};