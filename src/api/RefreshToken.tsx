import axios from "axios";
import { BASE_URI } from "./contants";
// import { apiGetRequest } from "./util/apiUtils";
// import { AuthResponse } from "./responsePayload/AuthResponse";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const token =
        localStorage.getItem("refreshToken") || "4d4a50524f4432303232";

      const response = await axios.get(`${BASE_URI}/refresh`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      });

      // const res = await apiGetRequest<AuthResponse>(Endpoint.Refresh);

      //TODO: change with real data
      const newToken = response.data.access;
      // localStorage.setItem("authToken", JSON.stringify(res?.access));
      // localStorage.setItem("refreshToken", JSON.stringify(res?.access));

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("refreshToken", response.data.refresh);
      return newToken;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return null;
    }
  };

  return { refresh };
};

export default useRefreshToken;
