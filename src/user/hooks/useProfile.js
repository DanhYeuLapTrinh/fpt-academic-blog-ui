import React, { useContext } from 'react'
import { ProfileContext } from '../context/ProfileProvider'

export default function useProfile() {
  return useContext(ProfileContext)
}