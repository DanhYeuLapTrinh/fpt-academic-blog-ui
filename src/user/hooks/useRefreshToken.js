import useAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
  let auth = JSON.parse(localStorage.getItem("auth"));
  const refresh = async () => {
    const response = await axios.post(process.env.REACT_APP_REFRESH_TOKEN, {
      refreshToken: auth.refreshToken,
    });
    auth.token = response?.data?.token;
    auth.refreshToken = response?.data?.refreshToken;
    localStorage.setItem("auth", JSON.stringify(auth));
    return response?.data?.token;
  };
  return refresh;
}
