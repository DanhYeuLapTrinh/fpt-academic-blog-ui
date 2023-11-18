import React, { useEffect, useState } from 'react'
import News from './News'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function NewsService() {
  const [news, setNews] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let news = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_NEWS
        );
        setNews(news?.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  return (
    <News news={news}/>
  )
}
