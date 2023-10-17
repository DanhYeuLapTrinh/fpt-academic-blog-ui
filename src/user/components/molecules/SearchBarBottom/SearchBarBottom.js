import { Stack } from '@mui/material'
import React from 'react'
import Text from '../../atoms/Text/Text'
import PostTag from '../../atoms/PostTag/PostTag'

export default function SearchBarBottom() {
  return (
    <Stack direction={'row'} spacing={2}>
      <Text fontSize="12px">Nổi bật: </Text>
      <PostTag color="primary.main"/>
      <PostTag color="primary.main"/>
      <PostTag color="primary.main"/>
      <PostTag color="primary.main"/>
    </Stack>
  )
}
