import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
export default function Dropzone() {
  // functon onDrop chỉ chạy khi người dùng bỏ ảnh vào
  // useCallback để tránh tình trạng bị rerender khi component Dropzone rerender
  // chỉ rerender khi có ảnh thôi
  const [file, setFile] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles) {
      const acceptedFiles = acceptedFiles.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setFile(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps({
        //styling
        style: {
          height: "300px",
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
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here...</p>
      ) : (
        <p>Drag and drop some files or click</p>
      )}
    </div>
  );
}
