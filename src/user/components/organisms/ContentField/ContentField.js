import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import "./ContentField.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
export default function ContentField() {
  const [content, setContent] = useState();
  const axiosPrivate = useAxiosPrivate();
  const handleUpload = async (blobInfo) => {
    console.log(blobInfo);
    const formData = new FormData();
    formData.append("file[]", blobInfo.blob(), blobInfo.filename());
    try {
      const response = await axiosPrivate.post(
        process.env.REACT_APP_IMAGE_UPLOAD,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div id="content">
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue) => {
          setContent(newValue);
        }}
        value={content}
        init={{
          images_upload_handler: handleUpload,
          plugins:
            "preview powerpaste searchreplace autolink autosave directionality advcode visualblocks visualchars fullscreen image link media codesample table anchor insertdatetime advlist lists wordcount tinymcespellchecker permanentpen pageembed quickbars linkchecker emoticons advtable autoresize",
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | bullist numlist | emoticons quickimage media link codesample | preview fullscreen",
          style_formats: [
            { title: "Paragraph", format: "p" },
            { title: "Heading 2", format: "h2" },
            { title: "Heading 3", format: "h3" },
          ],
          advlist_bullet_styles: "disc",
          advlist_number_styles: "number",
          media_live_embeds: true,
          menubar: false,
          min_height: 300,
          placeholder: "Nhập nội dung bài viết...",
          quickbars_selection_toolbar:
            "styles | bold italic underline blockquote | bullist numlist | quicklink quickimage quicktable ",
          toolbar_mode: "sliding",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:18px; font-weight:400;color:#444746; }",
        }}
      />
    </div>
  );
}
