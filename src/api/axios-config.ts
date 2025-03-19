import axios from "axios";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import { AuthErrors } from "../context/AuthContext.js";
import useRefreshToken from "./RefreshToken";
/* eslint-disable complexity */

export const setupInterceptors = (setLoading: (value: boolean) => void) => {
  const { refresh } = useRefreshToken()
  Request.interceptors.request.use(
    (config) => {
      setLoading(true); 
      showConsoleMessage("Resquest: ", config);
     
          const token = localStorage.getItem("authToken");
          config.headers.set("Accept", "*/*");
          config.headers.set("Content-Type", "application/json");
          if(token)    
            config.headers.set("Authorization", `${token}`);
          config.transformRequest = [(data) => data];
          return config;
    },
    (error) => {
      setLoading(false);
      showConsoleError("Request config error", error);
      return Promise.reject(error);
    }
  );

  Request.interceptors.response.use(
    (response) => {
      setLoading(false);
      showConsoleMessage("Response: Success", response);
      return response;
    },
    async (error) => {
      setLoading(false);
      showConsoleError("Response Error: ", error.response || error.message);

      const originalRequest = error.config;
      
      if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true; 
        try {
          const newToken = await refresh();
          if (newToken) {
            originalRequest.headers["Authorization"] = `${newToken}`;
            return Request(originalRequest); 
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      const errorMsg: AuthErrors = { data: { error: error.response || error.message || "Unknown error", status: -1  } };

      return Promise.reject(errorMsg);
    }
  );
};


export const Request = axios;
export default axios;

