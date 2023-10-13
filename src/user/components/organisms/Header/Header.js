import React from 'react'
import NavListContainer from '../../molecules/Navigation/NavListContainer'
import UserTab from '../../molecules/UserTab/UserTab'
import { Container, Stack } from '@mui/material'

export default function Header() {
  return (
    <Container sx={{padding: '15px 0'}}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <NavListContainer/>
        <UserTab/>
      </Stack>
    </Container>
  )
}
