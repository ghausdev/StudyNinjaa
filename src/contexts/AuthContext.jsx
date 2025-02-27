import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState({ student: false, tutor: false });
  const navigate = useNavigate();

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentRole");
    setUser(null);
    setProfiles({ student: false, tutor: false });
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("🔍 Initializing Auth Context");
      const token = localStorage.getItem("token");
      const userData = JSON.parse(localStorage.getItem("user"));

      console.log("📦 Stored Data:", {
        hasToken: !!token,
        userData,
        currentRole: localStorage.getItem("currentRole"),
      });

      if (token && userData) {
        try {
          const profileData = await AuthService.checkProfiles();
          console.log("👤 Profile Data:", profileData);
          setUser(userData);
          setProfiles(profileData);
        } catch (error) {
          console.error("❌ Error checking profiles:", error);
          clearAuthData();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (userData, token) => {
    console.log("🔐 Login called with:", { userData, hasToken: !!token });

    // Clear any existing auth data first
    clearAuthData();

    // Set new auth data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("currentRole", userData.role);

    setUser(userData);

    try {
      const profileData = await AuthService.checkProfiles();
      console.log("👤 Profile Data after login:", profileData);
      setProfiles(profileData);
    } catch (error) {
      console.error("❌ Error checking profiles after login:", error);
      clearAuthData();
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    navigate("/");
  };

  // Update the isStudent and isTutor checks
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isStudent =
    isAuthenticated && (user?.role === "student" || profiles.student);
  const isTutor = isAuthenticated && (user?.role === "tutor" || profiles.tutor);

  const checkAndUpdateProfiles = async () => {
    try {
      const profileData = await AuthService.checkProfiles();
      setProfiles(profileData);
      return profileData;
    } catch (error) {
      console.error("Error checking profiles:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isStudent,
    isTutor,
    profiles,
    checkAndUpdateProfiles,
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
