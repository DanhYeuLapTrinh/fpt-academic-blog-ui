import { Typography } from '@mui/material'
import React from 'react'

export default function Text({children,...props}) {
  const configText = {
    fontFamily: 'Roboto, sans-serif',
    color: 'text.main',
    fontWeight: "500",
    ...props,
  }
  return (
    <Typography {...configText}>{children}</Typography>
  )
}