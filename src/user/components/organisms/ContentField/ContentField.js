import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ContentField.scss";
import useContent from "../../../hooks/useContent";
import { Box } from "@mui/material";
import Text from "../../atoms/Text/Text";
export default function ContentField({ ...props }) {
  const { setContent, setWordcount } = useContent();

  return (
    <div style={{ margin: "15px 0", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          left: "800px",
          top: "12px",
          zIndex: 999,
          backgroundColor: "lightText.main",
          p: "3px 8px",
          borderRadius: "10px",
          opacity: "80%",
        }}
      >
        <Text fontSize="13px">{props.isSaving}</Text>
      </Box>
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue, editor) => {
          props.setIsSaving("Đang lưu...");
          setTimeout(() => {
            let content = JSON.parse(localStorage.getItem("content"));
            if (content) {
              content.contentTiny = newValue
              localStorage.setItem("content", JSON.stringify(content));
              setContent(newValue);
              let wordcount1 = editor.plugins.wordcount;
              setWordcount(wordcount1.body.getWordCount());
              props.setIsSaving("Đã lưu");
            }
          }, 1000);
        }}
        onInit={(evt, editor) => {
          setTimeout(() => {
            const { contentTiny } =
              JSON.parse(localStorage.getItem("content")) || "";
            if (contentTiny) {
              editor.setContent(contentTiny);
            }
          }, 100);
        }}
        init={{
          entity_encoding: "raw",
          images_upload_handler: props.handleImage,
          images_upload_url: "posts/image-upload",
          placeholder:
            "Nhập đoạn giới thiệu để mọi người biết rõ về bài viết hơn nhé...",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:18px; font-weight:400;color:#444746; margin: 8px !important;} img { width: 100%; border-radius: 10px; } iframe { width: 1128px !important; height: 628px !important;}",
          menubar: false,
          media_alt_source: false,
          image_dimensions: false,
          media_dimensions: false,
          media_poster: false,
          pagebreak_split_block: true,
          plugins:
            "preview searchreplace autolink directionality code fullscreen image link codesample table insertdatetime advlist lists wordcount quickbars emoticons autoresize media pagebreak",
          quickbars_selection_toolbar:
            "styles | bold italic underline blockquote | bullist numlist | quicklink image media quicktable",
          toolbar_mode: "sliding",
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | quicktable bullist numlist | image media link codesample | preview fullscreen restoredraft",
          style_formats: [
            { title: "Paragraph", format: "p" },
            { title: "Heading 2", format: "h2" },
            { title: "Heading 3", format: "h3" },
          ],
          advlist_bullet_styles: "disc",
          advlist_number_styles: "number",
          quickbars_insert_toolbar: "image media pagebreak",
          quickbars_image_toolbar: false,
          min_height: 230,
        }}
      />
    </div>
  );
}
