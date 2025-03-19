import { Endpoint } from "./contants";
import { apiPostRequest, createPayload } from "./util/apiUtils";
import { AuthResponse } from "./responsePayload/AuthResponse";
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

      const basePayload = {
        refresh: token,
      };

      const payload = createPayload(basePayload);
      const response = await apiPostRequest<AuthResponse>(
        Endpoint.Refresh,
        payload,
        { "Content-Type": "application/json" }
      );

      // const response = await axios.post(
      //   `${BASE_URI}/refresh`,
      //   {
      //     // Add the body here (for example, include a refresh token)
      //     refresh: token,
      //   },

      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       // Authorization: `Bearer ${token}`,
      //     },
      //     withCredentials: true,
      //   }
      // );

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
