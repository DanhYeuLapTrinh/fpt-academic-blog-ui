import React, { useEffect, useState } from 'react'
import ViewPendingReward from './ViewPendingReward'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';

export default function ViewPendingRewardService() {
  const [rewardPost, setRewardPost] = useState({})
  const axiosPrivate = useAxiosPrivate();
  const {slug} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(process.env.REACT_APP_VIEW_A_POST, {
          slug: slug
        })
        setRewardPost(response.data)
      } catch (error) {
        
      }
    }
    fetchData()
  }, [])
  return (
    <ViewPendingReward rewardPost={rewardPost}/>
  )
}
