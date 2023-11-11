import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { Button, Card, Input, Typography } from "@mui/material";
import { toast } from "react-toastify";
export default function App() {
  const sharedBgColor = "rgb(89, 39, 229)";
  const axiosPrivate = useAxiosPrivate();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasInputData, setHasInputData] = useState(false);

  console.log(hasInputData);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasInputData === true) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasInputData]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasInputData(true);
  };

  const handleEditorChange = (content) => {
    setContent(content);
    setHasInputData(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    editorRef.current.setContent("");
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng nhập cả tiêu đề và nội dung trước khi gửi.");
      return;
    }

    axiosPrivate
      .post(process.env.REACT_APP_ADD_NEWS, { title, content })
      .then((response) => {
        toast.success("Thêm tin tức thành công");
        resetForm();
        setHasInputData(false);
      })
      .catch((error) => {
        toast.error("Thêm tin tức thất bại");
        console.error(error);
        setHasInputData(false);
      });
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: "#333",
          fontSize: "24px",
          marginBottom: "20px",
        }}
        component="h4"
        gutterBottom
      >
        Thêm tin tức
      </Typography>
      <Card sx={{ marginBottom: 5 }}>
        <Input
          sx={{ padding: 1, fontWeight: "bold" }}
          fullWidth
          type="text"
          placeholder="Tiêu đề"
          disableUnderline
          value={title}
          onChange={handleTitleChange}
        />
      </Card>
      <Editor
        apiKey="jyymcsj2533984fe0lwdenxx5exsesynmz7lbatgw0cnnre9"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          placeholder: "Nhập nội dung tin tức ở đây !!!",
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleEditorChange}
      />
      <Button
        sx={{
          float: "right",
          bgcolor: sharedBgColor,
          marginTop: "10px",
          borderRadius: "20px",
          color: "white",
          width: "100px",
          height: "35px",
          "&:hover": {
            bgcolor: sharedBgColor,
            transform: "scale(1.1)",
          },
        }}
        onClick={handleSubmit}
      >
        Gửi
      </Button>
    </>
  );
}
