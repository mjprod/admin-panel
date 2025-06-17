import React, { createContext, useState, useEffect } from "react";
import { GetUser, Login, Logout } from "../api/apiCalls";
import useRefreshToken from "../api/RefreshToken";
import { UserResponse } from "../api/responsePayload/AuthResponse";
import { showConsoleError } from "../util/ConsoleMessage";

export interface AuthContextType {
  accessToken: string | undefined;
  loadingAuth: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: (callback?: () => void) => void;
  authErrors: AuthErrors | undefined;
  isSignedIn: boolean;
  user: UserResponse | undefined;
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
  const [user, setUser] = useState<UserResponse | undefined>();

  useEffect(() => {
    if (authErrors) {
      const timeout = setTimeout(() => {
        // setAuthErrors(undefined);
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
          if (valid) {
            getUserInfo();
          }
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
        getUserInfo();
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
          error: error?.message || error.data.error || "An error occurred during login",
          status: error?.status || 500,
        },
      });

      return false; // Return false on failure
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await GetUser();
      setUser(res);
    } catch (e) {
      showConsoleError(e);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        return;
      }
      await Logout(token);
      setIsSignedIn(false);
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
    } catch (e) {
      showConsoleError(e);
    }
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
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
