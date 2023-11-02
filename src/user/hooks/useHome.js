import React, { useContext } from 'react'
import { HomeContext } from '../context/HomeProvider'

export default function useHome() {
  return useContext(HomeContext)
}
