import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const getUserById = (id) => {
    return data.find((user) => user.id === parseInt(id));
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        data,
        getUserById,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
