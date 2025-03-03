
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthState } from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
  });

  // Check if user is already authenticated on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth) {
      setState({ isAuthenticated: true });
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === "admin123") {
      setState({ isAuthenticated: true });
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setState({ isAuthenticated: false });
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
