import React, { useCallback, useState } from "react";
import useHome from "../../../hooks/useHome";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Icon } from "@iconify/react";
import useProfile from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";
import { Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { useNavigate } from "react-router-dom";
export default function UploadCoverIcon(props) {
  const axiosPrivate = useAxiosPrivate();
  const { setProfileCoverURL } = useProfile();
  const auth = useAuth();
  const navigate = useNavigate()
  const handleSubmit = async (file) => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file[]", file);
      const response = await axiosPrivate.post(
        process.env.REACT_APP_UPLOAD_COVER,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const origin = response?.data?.imageURL;
      auth.coverURL = origin;
      localStorage.setItem("auth", JSON.stringify(auth));
      setProfileCoverURL(origin);
      return () => setProfileCoverURL(null);
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
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{
        bgcolor: 'rgba(100, 100, 100, 0.8)',
        p: 1,
        borderRadius: "10px",
      }}
      {...getRootProps()}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <input {...getInputProps()} />
        <Icon icon="heroicons:camera-solid" color="#ffffff" width="22" />
      </Stack>
      <Text color="secondary.main" fontSize="13px">
        Thêm ảnh bìa
      </Text>
    </Stack>
  );
}
