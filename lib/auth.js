// Authentification functions used in components/AuthProvider.js
import { jwtDecode } from 'jwt-decode';

/**
  * Login authentication with username and password. 
  *
  * Sends login request to the server via api/auth/login
  * endpoint, then sets the auth token in the session storage
  * or browser memory.
  * 
  * @param {string} username - The username of the user.
  * @param {string} password - The password of the user.
  * @returns {
  *  user,
  * }
  */
export const login = async (username, password) => {
  // GQL login request sent to server.
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const loginData = await response.json();
  
  // Set auth token in session storage or browser memory.
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('auth_token', loginData.token);    
  }
  return loginData.user;
};

/**
 * Performs logout action for user. 
 * 
 * Removes the auth token from the session storage or browser  
 * memory. Sends logout request to the server to invalidate the
 * token and removes the refresh token cookie.
 *   
 */
export const logout = async () => {
  if (typeof window !== 'undefined') {
      // Remove from session and browser memory.
      sessionStorage.removeItem('auth_token');

      // Delete refresh cookie on client side.
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";

      // GQL logout request sent to server.
      return await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  }
};

/**
  * Refreshes the access token for the user. 
  * 
  * Sends a request to the server to refresh the access token
  * and returns the new token.
  * 
  * @returns {string} - The new access token.
  */
export const refreshAccessToken = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (response.ok) {
      const { token, user } = await response.json();
      // Store the new access token in session storage browser memory.
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('auth_token', token);    
      }
      return user;
    } else {
      throw new Error('Token refresh failed');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;    
  }
}

// Get the token from the browser memory session.
export const getToken = () => {
  if (typeof window !== 'undefined') {
    let token = sessionStorage.getItem('auth_token');
    return token;
  }
  return null;
};

// Check if the token should be proactivately refreshed.
export const shouldRefreshToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    // Refresh if less than 5 minutes remaining.
    return decoded.exp - currentTime < 60;
  } catch (error) {
    return true;
  }
}

export const isAuthenticated = () => {
  let token = getToken();
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