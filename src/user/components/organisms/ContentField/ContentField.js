import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ContentField.scss";
import useContent from "../../../hooks/useContent";
import { Box } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { toSlug } from "../../../utils/StringMethod";
export default function ContentField({ ...props }) {
  const { setContent, setWordcount } = useContent();
  const [load, setLoad] = useState(false);
  return (
    <div style={{ margin: "15px 0", position: "relative" }}>
      {load && (
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
      )}
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue, editor) => {
          props.setIsSaving("Đang lưu...");
          setTimeout(() => {
            if (props.normal) {
              let content = JSON.parse(localStorage.getItem("content"));
              if (!content) content = {};
              content.contentTiny = newValue;
              localStorage.setItem("content", JSON.stringify(content));
              let wordcount1 = editor.plugins.wordcount;
              setWordcount(wordcount1.body.getWordCount());
              setContent(newValue);
            } else if (props.draft) {
              let draftContent = JSON.parse(
                localStorage.getItem("draftContent")
              );
              if (!draftContent) draftContent = {};
              draftContent.contentTiny = newValue;
              localStorage.setItem(
                "draftContent",
                JSON.stringify(draftContent)
              );
              let wordcount1 = editor.plugins.wordcount;
              setWordcount(wordcount1.body.getWordCount());
              setContent(newValue);
            } else {
              let editedContent = JSON.parse(
                localStorage.getItem("editedContent")
              );
              if (!editedContent) editedContent = {};
              editedContent.contentTiny = newValue;
              localStorage.setItem(
                "editedContent",
                JSON.stringify(editedContent)
              );
              let wordcount1 = editor.plugins.wordcount;
              setWordcount(wordcount1.body.getWordCount());
              setContent(newValue);
            }
            props.setIsSaving("Đã lưu");
          }, 1500);
        }}
        onInit={(evt, editor) => {
          setTimeout(() => {
            setLoad(true);
            if (props.normal) {
              const { contentTiny } =
                JSON.parse(localStorage.getItem("content")) || "";
              if (contentTiny) {
                editor.setContent(contentTiny);
                let wordcount1 = editor.plugins.wordcount;
                setWordcount(wordcount1.body.getWordCount());
              }
            } else if (props.draft) {
              const { contentTiny } =
                JSON.parse(localStorage.getItem("draftContent")) || "";
              if (contentTiny) {
                editor.setContent(contentTiny);
                let wordcount1 = editor.plugins.wordcount;
                setWordcount(wordcount1.body.getWordCount());
              }
            } else {
              const { contentTiny } =
                JSON.parse(localStorage.getItem("editedContent")) || "";
              if (contentTiny) {
                editor.setContent(contentTiny);
                let wordcount1 = editor.plugins.wordcount;
                setWordcount(wordcount1.body.getWordCount());
              }
            }
          }, 800);
        }}
        init={{
          entity_encoding: "raw",
          images_upload_handler: props.handleImage,
          images_upload_url: "posts/image-upload",
          placeholder:
            "Nhập đoạn giới thiệu để mọi người biết rõ về bài viết hơn nhé...",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:18px; font-weight:400;color:#444746; margin: 8px !important;} img {width: 100%; height:100%; border-radius: 10px;} iframe { width: 1128px !important; height: 628px !important;}",
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
          setup: (editor) => {
            editor.on("NodeChange", () => {
              editor.dom.select("h2").forEach((node) => {
                if (!node.id) {
                  node.id = toSlug(node.textContent);
                }
              });
            });
          },
        }}
      />
    </div>
  );
}
