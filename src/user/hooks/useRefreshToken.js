import React from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.post("auth/refresh-token", {
      refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
    });
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response?.data?.refreshToken)
    );
    setAuth((prev) => {
      return { ...prev, token: response?.data?.token };
    });
    return response.data.token;
  };
  return refresh;
}
