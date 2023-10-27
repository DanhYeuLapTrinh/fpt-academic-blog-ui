import { useEffect, useState } from "react";

const useAxios = (configObject) => {
  const {
    axiosInstance,
    method,
    endpoint,
    requestConfig = {}, // headers, data, token, ...
  } = configObject;

  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](endpoint, {
          ...requestConfig,
        });
        setResponse(res);
      } catch (error) {
        setError(error.status);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  return [response, error, isLoading];
};

export default useAxios;
