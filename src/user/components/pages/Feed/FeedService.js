import React, { useEffect, useState } from 'react'
import Feed from './Feed'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function FeedService() {
  const axiosPrivate = useAxiosPrivate();
  const [feed, setFeed] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let feed = await axiosPrivate.get(
          process.env.REACT_APP_FEEDS_LIST
        );
        setFeed(feed?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <Feed data={feed}/>
  )
}
