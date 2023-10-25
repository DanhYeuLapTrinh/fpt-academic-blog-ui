import useAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const refresh = async () => {
    const response = await axios.post("auth/refresh-token", {
      refreshToken: auth.refreshToken,
    });
    auth.refreshToken = response?.data?.refreshToken
    localStorage.setItem("auth", JSON.stringify(auth));
    setAuth((prev) => {
      return { ...prev, token: response?.data?.token };
    });
    return response.data.token;
  };
  return refresh;
}
