import React, { createContext, useState } from "react";
const ManagePostContext = createContext();
export default function ManagePostProvider({ children }) {
  const [pendingPosts, setPendingPosts] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [sort, setSort] = useState("Mới nhất");
  const [type, setType] = useState("Bài viết đang chờ");
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
        type,
        setType,
      }}
    >
      {children}
    </ManagePostContext.Provider>
  );
}
export { ManagePostContext };
