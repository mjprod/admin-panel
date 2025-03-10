import axios from "axios";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import { AuthErrors } from "../context/AuthContext.js";

export const setupInterceptors = (setLoading: (value: boolean) => void) => {
  // Request Interceptor
  Request.interceptors.request.use(
    (config) => {
      setLoading(true); 
      showConsoleMessage("Resquest: ", config);
          const token = localStorage.getItem("authToken") || "4d4a50524f4432303232";
          config.headers.set("Accept", "*/*");
          config.headers.set("Content-Type", "application/json");
          config.headers.set("Authorization", `Token ${token}`);
          config.transformRequest = [(data) => data];
          return config;
    },
    (error) => {
      setLoading(false);
      showConsoleError("Request config error", error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  Request.interceptors.response.use(
    (response) => {
      setLoading(false); 
      showConsoleMessage("Response:", response);

      return response;
    },
    (error) => {
      setLoading(false);
      showConsoleError("Response Error: ", error.response || error.message);
      const errorMsg: AuthErrors = { data: { error: error.response || error.message || "Unknown error", status: -1 } };
      return Promise.reject(errorMsg);
    }
  );
};

export const Request = axios;
export default axios;

