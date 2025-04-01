import axios from "axios";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import useRefreshToken from "./RefreshToken";
import { useAppDispatch } from "../store/hooks";
import { setLoading } from "../store/slice/loading.slice";
/* eslint-disable complexity */

export const setupInterceptors = () => {
  const dispatch = useAppDispatch();

  const { refresh } = useRefreshToken();

  Request.interceptors.request.use(
    (config) => {
      dispatch(setLoading(true));
      showConsoleMessage("Resquest: ", config);
      const token = localStorage.getItem("authToken");

      if (
        !config.url?.includes("/refresh") ||
        !config.url?.includes("/login")
      ) {
        config.headers.set("Accept", "*/*");
        config.headers.set("Content-Type", "application/json");
        if (token) {
          config.headers.set("Authorization", `${token}`);
        }
      }
      return config;
    },
    (error) => {
      dispatch(setLoading(false));
      showConsoleError("Request config error", error);
      return Promise.reject(error);
    }
  );

  Request.interceptors.response.use(
    (response) => {
      dispatch(setLoading(false));
      showConsoleMessage("Response: Success", response);
      return response;
    },
    async (error) => {
      dispatch(setLoading(false));
      showConsoleError("Response Error: ", error.response || error.message);

      const originalRequest = error.config;

      if (
        (error?.response?.status === 401 || error?.response?.status === 403) &&
        !originalRequest._retry
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
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export const RefreshRequest = axios.create();
export const Request = axios;
export default axios;
