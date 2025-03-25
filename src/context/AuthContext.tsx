import React, { createContext, useState, useEffect } from "react";
import { Login } from "../api/auth";
import useRefreshToken from "../api/RefreshToken";

export interface AuthContextType {
  accessToken: string | undefined;
  loadingAuth: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: (callback?: () => void) => void;
  authErrors: AuthErrors | undefined;
  isSignedIn: boolean;
}

export interface AuthErrors {
  data: {
    error: string;
    status: number;
  };
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [authErrors, setAuthErrors] = useState<AuthErrors>();

  useEffect(() => {
    if (authErrors) {
      const timeout = setTimeout(() => {
        setAuthErrors(undefined);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [authErrors]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { refresh } = useRefreshToken();

        if (token) {
          const valid = await refresh();
          setIsSignedIn(valid ? true : false);
        } else {
          setIsSignedIn(false);
        }
      } catch {
        setIsSignedIn(false);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await Login(username, password);

      if (response) {
        setIsSignedIn(true);
        localStorage.setItem("authToken", `Bearer ${response.access}`);
        localStorage.setItem("refreshToken", response.refresh);
        return true;
      }

      return false;
    } catch (error: any) {
      console.error("Login error:", error);

      setAuthErrors({
        data: {
          error: error?.message || "An error occurred during login",
          status: error?.status || 500,
        },
      });

      return false; // Return false on failure
    }
  };

  const logout = () => {
    setIsSignedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        loadingAuth,
        accessToken: undefined,
        login,
        logout,
        authErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
