import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function TagsPage() {
  const {tag} = useParams()
  return (
    <Container>{tag}</Container>
  )
}
