import React, { useContext } from 'react'
import { ErrorContext } from '../context/ErrorProvider'

export default function useError() {
  return useContext(ErrorContext)
}
