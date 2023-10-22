import React from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
  const {auth, setAuth} = useAuth();
  const refresh = async () => {
    const response = await axios.post("auth/refresh-token", {
      token: auth.refreshToken,
    });
    setAuth(prev => {
      return {...prev, token: response?.data?.token, refreshToken: response?.data?.refreshToken}
    })
    return response.data.token
  };
  return refresh
}