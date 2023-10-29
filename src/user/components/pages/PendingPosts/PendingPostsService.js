import React, { useEffect, useState } from 'react'
import PendingPosts from './PendingPosts'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function PendingPostsService() {
  const axiosPrivate = useAxiosPrivate()
  const [pendingPosts, setPendingPosts] = useState()
  const [type, setType] = useState("Bài viết đang chờ");
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosPrivate.get(process.env.REACT_APP_PENDING_POSTS)
        setPendingPosts(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    setIsLoading(false)
  }, [])
  return (
    <PendingPosts pendingPosts={pendingPosts} setType={setType} type={type} isLoading={isLoading}/>
  )
}
