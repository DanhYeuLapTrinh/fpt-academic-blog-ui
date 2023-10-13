import React, { createContext, useState } from "react";

const LoginContext = createContext();

function LoginProvider({children}) {
  const [email, setEmail] = useState();

  return (
    <LoginContext.Provider value={{ email, setEmail }}>
     {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };
