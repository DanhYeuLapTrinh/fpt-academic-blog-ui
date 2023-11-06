import React, { createContext, useState } from "react";
const ManagePostContext = createContext();
export default function ManagePostProvider({ children }) {
  const [pendingPosts, setPendingPosts] = useState();
  const [approvedPosts, setApprovedPosts] = useState();
  const [pendingQ, setPendingQ] = useState();
  const [approvedQ, setApprovedQ] = useState();
  const [sort, setSort] = useState("Mới nhất");
  const [type, setType] = useState("Bài viết đang chờ");
  const [questionType, setQuestionType] = useState("Câu hỏi đang chờ");
  const [qAmount, setQAmount] = useState(0);
  const [qApprovedAmount, setQApprovedAmount] = useState(0);
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
        questionType,
        setQuestionType,
        pendingQ,
        setPendingQ,
        qAmount,
        setQAmount,
        qApprovedAmount,
        setQApprovedAmount,
        approvedQ,
        setApprovedQ,
      }}
    >
      {children}
    </ManagePostContext.Provider>
  );
}
export { ManagePostContext };
