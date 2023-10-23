import { Typography } from '@mui/material'
import React from 'react'

export default function Text({children,...props}) {
  const configText = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: "500",
    sx: {
      textOverflow: "ellipsis",
      color: props.color ? props.color : 'text.main',
    },
    ...props,
  }
  return (
    <Typography {...configText}>{children}</Typography>
  )
}