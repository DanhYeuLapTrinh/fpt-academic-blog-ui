import React, { useContext } from 'react'
import { ContentContext } from '../context/ContentProvider'

export default function useContent() {
  return useContext(ContentContext)
}
