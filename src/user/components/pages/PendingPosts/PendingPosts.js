import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

export default function PendingPosts() {
  const axiosPrivate = useAxiosPrivate()
  const [post, setPost] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("lecturer/posts/pending")
        setPost(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Container>
      PendingPost:
      {/* {post?.map(item => {
        const data = JSON.stringify(item)
        return <div style={{padding: '10px 0'}}>{data}</div>
      })} */}

    </Container>
  )
}
