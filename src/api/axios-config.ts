import axios from "axios";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import { AuthErrors } from "../context/AuthContext.js";

axios.interceptors.request.use(
  async (config) => {
    showConsoleMessage("Resquest: ", config);
    const token = localStorage.getItem("authToken") || "4d4a50524f4432303232";
    config.headers.set("Accept", "*/*");
    config.headers.set("Content-Type", "application/json");
    config.headers.set("Authorization", `Token ${token}`);
    config.transformRequest = [(data) => data];
    return config;
  },
  (error) => {
    showConsoleError("Request config error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    showConsoleMessage("Response:", response);
    // if (response.data?.ResponseCode !== 0) {
    //   const error: AuthErrors = { data: { error: response.data?.ResponseMsg || "Unknown error", status: response.data.ResponseCode } };
    //   return Promise.reject(error);
    // }
    return response;
  },
  (e) => {
    showConsoleError("Response Error: ", e.response || e.message);
    const error: AuthErrors = { data: { error: e.response || e.message || "Unknown error", status: -1 } };
    return Promise.reject(error);
  }
);

export const Request = axios;
export default axios;

