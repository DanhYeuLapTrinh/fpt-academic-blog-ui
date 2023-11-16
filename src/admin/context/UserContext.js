import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [records, setRecords] = useState([]);

  return (
    <UserContext.Provider
      value={{
        data,
        getUserById: (id) => data.find((user) => user.id === id),
        setData,
        records,
        setRecords,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
