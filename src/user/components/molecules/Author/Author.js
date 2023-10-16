import React from 'react'
import UserProfile from '../../atoms/UserProfile/UserProfile'
import Text from '../../atoms/Text/Text'
import { Stack } from '@mui/material'

export default function Author(props) {
  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={1}>
      <UserProfile width="28px" height="28px" src="https://images.unsplash.com/photo-1696075619158-3a70ee76b290?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80"
      alt="User"/>
      <Text fontSize="12px" color={props.color}>bởi Chat GPT</Text>
      <Text fontSize="20px" color={props.color}>&middot;</Text>
      <Text fontSize="12px" color={props.color}>30 phút trước</Text>
    </Stack>
  )
}