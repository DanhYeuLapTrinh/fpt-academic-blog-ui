import { useEffect, useState } from "react";

const useAxios = (configObject) => {
  const {
    axiosInstance,
    method,
    endpoint,
    requestConfig = {}, // headers, data, token, ...
  } = configObject;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](endpoint, {
          ...requestConfig,
        });
        setResponse(JSON.stringify(res));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // clean - nếu component unmount thì dừng việc call API
  }, []);

  return [response, error, isLoading];
};

export default useAxios;
