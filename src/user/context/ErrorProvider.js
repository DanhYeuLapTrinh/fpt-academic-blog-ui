import React, { createContext, useState } from 'react'
const ErrorContext = createContext()
export default function ErrorProvider({children}) {
  const [errorMsg, setErrorMsg] = useState()
  return (
    <ErrorContext.Provider value={{errorMsg, setErrorMsg}}>
      {children}
    </ErrorContext.Provider>
  )
}

export {ErrorContext}
