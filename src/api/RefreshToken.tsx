import { Endpoint } from "./contants";
import { apiPostRequest, createPayload } from "./util/apiUtils";
import { AuthResponse } from "./responsePayload/AuthResponse";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        console.error("No refresh token found.");
        return null;
      }

      const basePayload = {
        refresh: token,
      };

      const payload = createPayload(basePayload);
      const response = await apiPostRequest<AuthResponse>(
        Endpoint.Refresh,
        payload,
        { "Content-Type": "application/json" }
      );

      if (response == null) {
        return null;
      }
      const newToken = `Bearer ${response.access}`;

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("refreshToken", response.refresh);

      return newToken;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return null;
    }
  };

  return { refresh };
};

export default useRefreshToken;
