import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import useError from "./useError";
import { msg } from "../data/ErrorMessage";

export default function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { setErrorMsg } = useError();
  const auth = useAuth();
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
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (rfError) {
            let code = error.response.status;
            setErrorMsg({ code, message: msg[code] });
            navigate("/login", { replace: true });
            return Promise.reject(rfError);
          }
        }
        // try {
        //   if (error?.response?.status === 401) {
        //     // 401 Unauthorized
        //     let code = error.response.status;
        //     setErrorMsg({ code, message: msg[code] });
        //     navigate("/login", { replace: true });
        //   }
        // } catch (error) {
        //   console.log("reject")
        //   return Promise.reject(error);
        // }
        // else if (error?.response?.status === 404) {
        //   navigate("/404-not-found", { replace: true });
        // } else if (error?.response?.status === 400) {
        // }
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
