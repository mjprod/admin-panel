import axios from "axios";
import { BASE_URI } from "./contants";
// import { apiGetRequest } from "./util/apiUtils";
// import { AuthResponse } from "./responsePayload/AuthResponse";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const token = localStorage.getItem("refreshToken");
      if (!token) {
        console.error("No refresh token found.");
        return null;
      }

      const response = await axios.get(`${BASE_URI}/refresh`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // const res = await apiGetRequest<AuthResponse>(Endpoint.Refresh);

      //TODO: change with real data
      const newToken = response.data.access;
      // localStorage.setItem("authToken", JSON.stringify(res?.access));
      // localStorage.setItem("refreshToken", JSON.stringify(res?.access));

      localStorage.setItem("authToken", `Bearer ${newToken}`);
      localStorage.setItem("refreshToken", `Bearer ${response.data.refresh}`);

      return newToken;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return err;
    }
  };

  return { refresh };
};

export default useRefreshToken;
