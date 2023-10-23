import React, { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const RememberMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const verifyRFToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth.token ? verifyRFToken() : setIsLoading(false)
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`token: ${JSON.stringify(auth?.token)}`)
  }, [isLoading])
  return <>
    {isLoading ? <p>Loading...</p> : <Outlet/>}
  </>;
}

export default RememberMe