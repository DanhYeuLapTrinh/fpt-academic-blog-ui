import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
export default function Dropzone() {
  // functon onDrop chỉ chạy khi người dùng bỏ ảnh vào
  // useCallback để tránh tình trạng bị rerender khi component Dropzone rerender
  // chỉ rerender khi có ảnh thôi
  const [file, setFile] = useState();
  const [rejectedFile, setRejectedFile] = useState()
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.[0]) {
      setFile({
        ...acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    }
    if(rejectedFiles?.[0]) {
      setRejectedFile(rejectedFiles?.[0])
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 5000 
  });
  return (
    <Box sx={{padding: '10px 12px 20px '}}>
      <div
        {...getRootProps({
          //styling
          style: {
            minHeight: "300px",
            backgroundColor: "#f7f9fc",
            border: "2px dashed black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "10px",
            borderImage:
              "repeating-linear-gradient(0deg, red, red 5px, transparent 5px, transparent 10px)",
          },
          //
        })}
      >
        {!file ? (
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop files here...</p>
            ) : (
              <p>Drag and drop some files or click</p>
            )}
          </>
        ) : (
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{ position: "absolute", top: "0", right: "0" }}
              onClick={() => setFile()}
            >
              <DeleteIcon />
            </IconButton>
            <img src={file?.preview} alt="" style={{ width: "100%" }} />
          </Box>
        )}
      </div>
    </Box>
  );
}
