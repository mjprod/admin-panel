import React, { createContext, useState, useEffect } from "react";
import { Login } from "../api/auth";

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
    // 🔥 Check authentication state on load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        setIsSignedIn(!!token);
      } catch {
        setIsSignedIn(false);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // const login = async (username: string, password: string) => {
  //   const response = await Login(username, password).catch((error) => {
  //     console.log("-----LOGIN---ERROR---", error);

  //     if (error.code === "ERR_NETWORK") {
  //       setAuthErrors({
  //         data: {
  //           error: "Network error",
  //           status: 503,
  //         },
  //       });
  //     } else {
  //       setAuthErrors(error);
  //     }
  //   });

  //   if (response) {
  //     console.log("-----LOGIN---response---", response);

  //     setIsSignedIn(true);

  //     localStorage.setItem("authToken", JSON.stringify(response.access));
  //     localStorage.setItem("refreshToken", JSON.stringify(response.refresh));
  //   }
  //   return true;
  // };

  const login = async (username: string, password: string) => {
    try {
      const response = await Login(username, password);

      if (response) {
        setIsSignedIn(true);
        localStorage.setItem("authToken", `Bearer ${response.access}`);
        localStorage.setItem("refreshToken", `Bearer ${response.refresh}`);
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

    // localStorage.removeItem("user_logged");
    // localStorage.removeItem("local_api_logged");
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
