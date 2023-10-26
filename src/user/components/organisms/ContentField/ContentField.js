import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ContentField.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useRefreshToken from "../../../hooks/useRefreshToken";
export default function ContentField() {
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const [content, setContent] = useState();
  const editorRef = useRef(null);
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
      if (error.response?.status === 401) {
        refresh();
      }
    }
  };

  return (
    <div style={{margin: '15px 0'}}>
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue) => {
          setContent(newValue);
        }}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.off("paste");
        }}
        init={{
          paste_block_drop: false,
          entity_encoding: "raw",
          images_upload_handler: handleImage,
          images_upload_url: "posts/image-upload",
          automatic_uploads: true,
          images_upload_url: "hello",
          placeholder: "Nhập nội dung bài viết...",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:18px; font-weight:400;color:#444746; margin: 8px !important;} img { width: 100%; border-radius: 10px; } iframe { width: 1128px !important; height: 628px !important;}",
          menubar: false,
          media_alt_source: false,
          image_dimensions: false,
          media_dimensions: false,
          media_poster: false,
          plugins:
            "preview searchreplace autolink directionality code fullscreen image link codesample table insertdatetime advlist lists wordcount quickbars emoticons autoresize media",
          quickbars_selection_toolbar:
            "styles | bold italic underline blockquote | bullist numlist | quicklink image media quicktable",
          toolbar_mode: "sliding",
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | quicktable bullist numlist | image media link codesample | preview fullscreen",
          style_formats: [
            { title: "Paragraph", format: "p" },
            { title: "Heading 2", format: "h2" },
            { title: "Heading 3", format: "h3" },
          ],
          advlist_bullet_styles: "disc",
          advlist_number_styles: "number",
          quickbars_insert_toolbar: false,
          quickbars_image_toolbar: false
        }}
      />
    </div>
  );
}
