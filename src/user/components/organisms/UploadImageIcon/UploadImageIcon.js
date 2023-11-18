import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Icon } from "@iconify/react";
import useProfile from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function UploadImageIcon(props) {
  const axiosPrivate = useAxiosPrivate();
  const { setAvatarURL } = useProfile();
  const auth = useAuth();
  const navigate = useNavigate()
  const handleSubmit = async (file) => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file[]", file);
      const response = await axiosPrivate.post(
        process.env.REACT_APP_UPLOAD_AVATAR,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const origin = response?.data?.imageURL;
      auth.profileURL = origin;
      localStorage.setItem("auth", JSON.stringify(auth));
      setAvatarURL(origin);
    } catch (error) {
      if(error?.response?.status === 405){
        toast.error("Tài khoản của bạn đã bị khóa")
        navigate("/login", { replace: true });
        localStorage.removeItem("auth")
      }
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.[0]) {
      handleSubmit(acceptedFiles?.[0]);
    }
    if (rejectedFiles?.[0]) {
      toast.error("File không hợp lệ hoặc quá lớn");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxSize: 1024 * 5000,
  });

  return (
    <div
      {...getRootProps({
        //styling
        style: {
          height: "36px",
          width: "36px",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "50px",
        },
      })}
    >
      <input {...getInputProps()} />
      <Icon icon="heroicons:camera-solid" color="#444746" width="22" />
    </div>
  );
}
