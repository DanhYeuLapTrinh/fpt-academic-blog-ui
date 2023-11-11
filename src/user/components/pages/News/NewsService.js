import React, { useEffect, useState } from 'react'
import News from './News'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function NewsService() {
  const [news, setNews] = useState([])
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let news = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_NEWS
        );
        setNews(news?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <News news={news}/>
  )
}
