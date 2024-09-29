// Authentification functions used in components/AuthProvider.js
import { jwtDecode } from 'jwt-decode';
import { client } from '@/lib/apollo-client';
import { redirect } from 'next/navigation'

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
      sessionStorage.clear();

      // Delete refresh cookie on client side.
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; samesite=strict";

      await client.clearStore();
      await clearAppCache();

      // GQL logout request sent to server.
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      redirect('/');
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

export const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
} 

export const clearAppCache = async () => {
  // Clear localStorage
  localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear IndexedDB
  const databases = await window.indexedDB.databases();
  databases.forEach(db => {
    window.indexedDB.deleteDatabase(db.name);
  });

  // Clear cookies (client-side approach, may not work for HttpOnly cookies)
  document.cookie.split(";").forEach(cookie => {
    document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, 
      "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Clear Service Worker caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }

  // Unregister Service Workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration => registration.unregister()));
  }

  // Clear Application Cache (deprecated, but included for completeness)
  if (window.applicationCache) {
    window.applicationCache.abort();
  }

  console.log('Application-specific caches and storage have been cleared.');
}

// Usage
clearAppCache().then(() => {
  console.log('Cache clearing complete');
}).catch(error => {
  console.error('Error clearing cache:', error);
});