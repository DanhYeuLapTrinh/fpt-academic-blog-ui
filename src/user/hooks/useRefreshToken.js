import React from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
  const {auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.post("auth/refresh-token", {
      token: auth.token,
      // withCredentials: true,
    });
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.token)
      return {...prev, token: response.data.token}
    })
    return response.data.token
  };
  return refresh
}
