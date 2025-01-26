import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
    
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      
      // Check if both token and user data exist
      if (token && userData) {
        setUser(userData);
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = (userData, token) => {
    // If user is a tutor and hasn't completed onboarding, redirect them
    if (userData.role === 'tutor' && !userData.onboardingCompleted) {
      // Save token and user data to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      // Redirect will be handled by the protected route
    } else {
      // Regular login flow for other users
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear user state
    setUser(null);
  };

  // Ensure the user object has a role property
  const isAuthenticated = !!user; // True if user is not null
  const isAdmin = user?.role === 'admin'; // Check if user is an admin
  const isStudent = user?.role === 'student'; // Check if user is a student
  const isTutor = user?.role === 'tutor'; // Check if user is a tutor

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isStudent,
    isTutor,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}