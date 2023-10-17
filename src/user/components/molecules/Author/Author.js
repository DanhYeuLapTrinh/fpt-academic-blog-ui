import React from 'react'
import UserProfile from '../../atoms/UserProfile/UserProfile'
import Text from '../../atoms/Text/Text'
import { Stack } from '@mui/material'

export default function Author(props) {
  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={1}>
      {props.author && <UserProfile width="28px" height="28px" src="../assets/img/rec.jpg"
      alt="User"/>}
      <Text fontSize="12px" color={props.color ? props.color : 'text.main'}>{props.text} {props.question && 'câu trả lời'}</Text>
      <Text fontSize="20px" color={props.color ? props.color : 'text.main'}>&middot;</Text>
      <Text fontSize="12px" color={props.color ? props.color : 'text.main'}>30 phút trước</Text>
    </Stack>
  )
}