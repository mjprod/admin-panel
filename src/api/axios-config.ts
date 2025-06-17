import axios from "axios";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import { AuthErrors } from "../context/AuthContext.js";
import useRefreshToken from "./RefreshToken";
import { ragKey } from "./contants";
/* eslint-disable complexity */

export const setupInterceptors = (setLoading: (value: boolean) => void) => {
  const { refresh } = useRefreshToken();
  Request.interceptors.request.use(
    (config) => {
      // setLoading(true);
      showConsoleMessage("Resquest: ", config);
      const token = localStorage.getItem("authToken");

      if (
        !config.url?.includes("/refresh") ||
        !config.url?.includes("/login")
      ) {
        config.headers.set("Accept", "*/*");
        config.headers.set("Content-Type", "application/json");
        if (token && !config.url?.includes("/rag-chat")) {
          config.headers.set("Authorization", `${token}`);
        } else if (ragKey && config.url?.includes("/rag-chat")) {
          config.headers.set("Authorization", `Api-Key ${ragKey}`);
        }
      }

      if (config.url?.includes("/rag-chat")) {
        config.timeout = 300000; // 5 minutes
      }
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
      const token = localStorage.getItem("refreshToken");

      if (
        (error?.response?.status === 401 || error?.response?.status === 403) &&
        !originalRequest._retry &&
        token
      ) {

        originalRequest._retry = true;
        try {
          const newToken = await refresh();
          if (newToken) {
            originalRequest.headers["Authorization"] = `${newToken}`;
            return Request(originalRequest);
          } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");

          return Promise.reject(refreshError);
        }
      }

      const errorMsg: AuthErrors = {
        data: {
          error: error.response || error.message || "Unknown error",
          status: -1,
        },
      };

      return Promise.reject(errorMsg);
    }
  );
};

export const RefreshRequest = axios.create();
export const Request = axios;
export default axios;
