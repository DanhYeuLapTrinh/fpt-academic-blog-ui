import React from 'react'
import SectionTitle from '../../molecules/SectionTitle/SectionTitle'
import { Box } from '@mui/material'
import RewardedPostsUnder from '../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder'
import Post from '../../organisms/Post/Post'

export default function PostList() {
  return (
    <Box width={"740px"} sx={{marginTop: '59px'}}>
      <SectionTitle title="Bài viết" filter post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </Box>
  )
}