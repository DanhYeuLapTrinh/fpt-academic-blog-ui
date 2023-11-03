import React, { createContext, useState } from "react";
const ManagePostContext = createContext();
export default function ManagePostProvider({ children }) {
  const [pendingPosts, setPendingPosts] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [sort, setSort] = useState("Mới nhất");
  const [amount, setAmount] = useState(0);
  const [approvedAmount, setApprovedAmount] = useState(0);
  return (
    <ManagePostContext.Provider
      value={{
        pendingPosts,
        setPendingPosts,
        approvedPosts,
        setApprovedPosts,
        sort,
        setSort,
        amount,
        setAmount,
        approvedAmount,
        setApprovedAmount,
      }}
    >
      {children}
    </ManagePostContext.Provider>
  );
}
export { ManagePostContext };
