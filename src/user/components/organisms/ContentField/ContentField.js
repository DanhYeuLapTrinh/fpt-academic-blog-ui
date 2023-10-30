import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ContentField.scss";
import useContent from "../../../hooks/useContent";
export default function ContentField({...props}) {
  const {setContent, setWordcount} = useContent()
  return (
    <div style={{ margin: "15px 0" }}>
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue, editor) => {
          setTimeout(() => {
            localStorage.setItem("content", JSON.stringify(newValue));
            setContent(newValue);
            const wordcount1 = editor.plugins.wordcount
            setWordcount(wordcount1.body.getWordCount())
          }, 1000);
        }}
        onInit={(evt, editor) => {
          setTimeout(() => {
            const data = JSON.parse(localStorage.getItem("content"));
            if(data) {
              editor.setContent(data);
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
