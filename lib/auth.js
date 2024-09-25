// Authentification functions used in components/AuthProvider.js
import { jwtDecode } from 'jwt-decode';

// Sends request to the server api/login route
// with the username and password. The login route
// calls the WP GraphQL mutation login to get the
// auth token. The token is returned and stored 
// in a session for later use.
export const login = async (username, password) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const user = await response.json();
  
  if (typeof window !== 'undefined') {
    // Set the JWT token in an HttpOnly cookie.
    document.cookie = `auth_token=${user.jwtAuthToken}; Secure; HttpOnly; SameSite=Strict; Path=/`;
  }
  // Delete the user token, now stored in the session, from the user object
  // and send the user data back to the client for use in AuthProvider.
  delete user.jwtAuthToken;
  return user;
};

// The session is destroyed. 
// TODO: call login route to invalidate token. 
export const logout = async () => {
  if (typeof window !== 'undefined') {
      // Remove the auth token cookie
      document.cookie = 'auth_token=; Max-Age=0; Secure; HttpOnly; SameSite=Strict; Path=/';

      //Call the backend to invalidate the token
      return await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  }
};

// Get the token from the cookie.
export const getToken = () => {
  if (typeof window !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
    if (match) return match[2];
  }
  return null;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
    // No token, user logged out or token error ( i.e. invalid or expired token )
  try {
    // Got a token, verify/decode it.
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};