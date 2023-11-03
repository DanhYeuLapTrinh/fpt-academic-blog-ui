import { Stack } from '@mui/material'
import React from 'react'
import RewardedPostsUnder from '../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder'
import { getFirstChar } from '../../../utils/StringMethod'

export default function ApprovedPost(props) {
  return (
    <Stack p={"20px 0"}>
      {props?.approvedPosts?.map((item) => (
        <RewardedPostsUnder
          key={item.postId}
          url={item.coverURL}
          postPath={item.slug}
          title={item.title}
          description={item.description}
          avatar={item.avatarURL}
          label={item.accountName}
          major={getFirstChar(item.category[0])}
          subject={item.category[1]}
          tag={item.tag}
          time={item.dateOfPost}
          postId={item.postId}
        />
      ))}
    </Stack>
  )
}
