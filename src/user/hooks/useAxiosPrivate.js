import React from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

export default function useAxiosPrivate() {
  const refresh = useRefreshToken()
  const {auth} = useAuth()
  return (
    <div>useAxiosPrivate</div>
  )
}
