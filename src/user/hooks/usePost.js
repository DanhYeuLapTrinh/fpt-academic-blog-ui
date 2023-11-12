import React, { useContext } from 'react'
import { PostContext } from '../context/PostProvider'

export default function usePost() {
  return useContext(PostContext)
}