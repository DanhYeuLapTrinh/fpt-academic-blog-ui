import useAxiosPrivate from "../../user/hooks/useAxiosPrivate";
export default function useAxios() {
  const axiosPrivate = useAxiosPrivate();

  return axiosPrivate;
}
