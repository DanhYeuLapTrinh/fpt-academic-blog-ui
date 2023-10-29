import { useContext } from 'react'
import { PostTagContext } from '../context/PostTagProvider'

export default function usePostTag() {
  return useContext(PostTagContext)
}
