import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgress, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { axiosPrivate } from "../../../api/axios";
import ImageDrop from "../../atoms/ImagePlaceholder/ImageDrop";
import ImageClick from "../../atoms/ImagePlaceholder/ImageClick";
import { Icon } from "@iconify/react";
export default function Dropzone() {
  // functon onDrop chỉ chạy khi người dùng bỏ ảnh vào
  // useCallback để tránh tình trạng bị rerender khi component Dropzone rerender
  // chỉ rerender khi có ảnh thôi
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [rejectedFile, setRejectedFile] = useState();
  const [link, setLink] = useState();
  const handleSubmit = async (file) => {
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("file[]", file);
    const response = await axiosPrivate.post(
      process.env.REACT_APP_IMAGE_UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const origin = response.data.link;
    setLink(origin);
    setIsLoading(false);
    setTimeout(() => {
      localStorage.setItem("coverURL", JSON.stringify(origin))
    }, 5000)
  };
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.[0]) {
      setFile((prev) => (prev = acceptedFiles?.[0]));
      handleSubmit(acceptedFiles?.[0]);
    }
    if (rejectedFiles?.[0]) {
      setRejectedFile(rejectedFiles?.[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 5000,
  });
  return (
    <Box sx={{ padding: "5px 0 30px " }}>
      {!file ? (
        <div
          {...getRootProps({
            //styling
            style: {
              minHeight: "220px",
              backgroundColor: "#f7f9fc",
              border: "2px dashed #c3c3c3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "10px",
              borderStyle: "dashed",
              borderWidth: "2px 2px",
            },
          })}
        >
          <>
            <input {...getInputProps()} />
            {isDragActive ? <ImageDrop /> : <ImageClick />}
          </>
        </div>
      ) : (
        <Box sx={{ position: "relative" }}>
          {isLoading ? (
            <div
              style={{
                minHeight: "200px",
                backgroundColor: "#f7f9fc",
                border: "2px dashed #c3c3c3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: "10px",
                borderStyle: "dashed",
                borderWidth: "2px 2px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <Box sx={{ position: "relative" }}>
              <img
                src={link}
                alt=""
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <IconButton
                disableRipple
                disableTouchRipple
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "lightText.main",
                  borderRadius: "5px",
                  p: "4px 6px",
                  opacity: '85%'
                }}
                onClick={() => {
                  setFile()
                  localStorage.removeItem("coverURL")
                }}
              >
                <Icon
                  icon="ic:baseline-delete-outline"
                  color="black"
                  width="29"
                />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
