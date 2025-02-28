// src/utils/auth.js
// src/utils/auth.js or src/utils/auth.jsx
import * as jwt_decode from 'jwt-decode';


// Check if user is authenticated by checking token validity
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwt_decode(token);  // Decode the JWT token
    const currentTime = Date.now() / 1000;   // Get current time in seconds

    // If token is expired, remove from localStorage and return false
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

// Function to get the token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Store the token in localStorage after successful login
export const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove the token when logging out
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};
