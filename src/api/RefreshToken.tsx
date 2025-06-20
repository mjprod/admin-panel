import { Endpoint } from "./contants";
import { createPayload } from "./util/apiUtils";
import { AuthResponse } from "./responsePayload/AuthResponse";
import { RefreshRequest } from "./axios-config";
import { triggerGlobalLogout } from "../util/logoutHandlex";
import { showConsoleError } from "../util/ConsoleMessage";

const useRefreshToken = () => {
  const refresh = async () => {
    const token = localStorage.getItem("refreshToken");
    if (!token) {
      showConsoleError("No refresh token found.");
      return null;
    }

    const basePayload = {
      refresh: token,
    };

    const payload = createPayload(basePayload);
    try {
      const response = await RefreshRequest.post<AuthResponse>(
        Endpoint.Refresh,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response || !response.data) {
        return null;
      }

      const newToken = `Bearer ${response.data.access}`;
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("refreshToken", response.data.refresh);

      return newToken;
    } catch (err) {
      showConsoleError("Refresh failed:", err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      triggerGlobalLogout()
      return null;
    }
  };
  return { refresh };
};

export default useRefreshToken;
