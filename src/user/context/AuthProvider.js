import React, { createContext, useState } from 'react'
const AuthContext = createContext({user: "", role: "", isAuth: false})
export default function AuthProvider({children}) {
  const [user,setUser] = useState({user: "", role: "", isAuth: false})
  const login = (username, role) => {
    setUser(prev => ({
      user: username,
      role: role,
      isAuth: true
    }))
  }

  const logout = () => {
    setUser(prev => ({
      user: "",
      role: "",
      isAuth: false
    }))
  }
  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext}
