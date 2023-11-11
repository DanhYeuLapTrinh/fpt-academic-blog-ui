import React from 'react'
import Comment from '../../molecules/Comment/Comment'
import { Stack } from '@mui/material'

export default function CommentsList(props) {
  return (
    <Stack>
      {props.comments.map((comment) => (
        <Comment/>
      ))}
    </Stack>
  )
}