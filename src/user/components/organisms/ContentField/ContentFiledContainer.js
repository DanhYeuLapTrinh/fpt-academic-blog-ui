import React, { useState } from "react";
import ContentField from "./ContentField";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ContentFiledContainer() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState("Chưa lưu");
  const handleImage = async (blobInfo) => {
    try {
      const formData = new FormData();
      formData.append("file[]", blobInfo.blob(), blobInfo.filename());
      const response = await axiosPrivate.post(
        process.env.REACT_APP_IMAGE_UPLOAD,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) return response?.data.link;
    } catch (error) {
      if(error?.response?.status === 405){
        toast.error("Tài khoản của bạn đã bị khóa")
        navigate("/login", { replace: true });
        localStorage.removeItem("auth")
      } else {
        toast.error("Đã có lỗi xảy ra")
      }
    }
  };
  return (
    <ContentField
      handleImage={handleImage}
      isSaving={isSaving}
      setIsSaving={setIsSaving}
      normal
    />
  );
}
