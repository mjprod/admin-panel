import axios from "axios";
import { BASE_URI } from "./contants";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.get(`${BASE_URI}/refresh-token`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      //TODO: change with real data
      const newToken = response.data.token;
      localStorage.setItem("authToken", newToken);
      return newToken;
    } catch (err) {
      console.error("Refresh token failed:", err);
      return null;
    }
  };

  return { refresh };
};

export default useRefreshToken;
