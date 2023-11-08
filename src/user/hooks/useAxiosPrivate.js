import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import useError from "./useError";
import { msg } from "../data/ErrorMessage";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { setErrorMsg } = useError();
  let auth = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
      axiosPrivate.interceptors.response.eject(requestInterceptor);
    };
  }, [auth, refresh]);
  return axiosPrivate;
}
