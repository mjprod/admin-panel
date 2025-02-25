import React, { createContext, useState, useEffect } from "react";

export interface AuthContextType {
  accessToken: string | undefined;
  loadingAuth: boolean;  
  login: (email: string, password: string) => Promise<boolean>;
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
  const [loadingAuth] = useState(false);
  const [authErrors, setAuthErrors] = useState<AuthErrors>();
  
  useEffect(() => {
    if (authErrors) {
      const timeout = setTimeout(() => {
        setAuthErrors(undefined);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [authErrors]);

  const login = async (email: string, password: string) => {
    // const response = await loginByUsername(email, password).catch((error) => {
    //   if (error.code === "ERR_NETWORK") {
    //     setAuthErrors({
    //       data: {
    //         error: "Network error",
    //         status: 503,
    //       },
    //     });
    //   } else {
    //     setAuthErrors(error);
    //   }
    // });

    // if (response) {
    //   setIsSignedIn(true);
    //   localStorage.setItem("user_logged", JSON.stringify(response));
    //   localStorage.setItem(
    //     "local_api_logged",
    //     JSON.stringify(response.ResponseData.LocalAPIURL)
    //   );
    // }
    return true;
  };

  const logout = () => {
    setIsSignedIn(false);
    localStorage.removeItem("user_logged");
    localStorage.removeItem("local_api_logged");
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
