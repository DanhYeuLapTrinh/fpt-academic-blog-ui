import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";
import "./ContentField.scss";
export default function ContentField() {
  const [content, setContent] = useState();

  return (
    <div id="content">
      <Editor
        apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
        onEditorChange={(newValue) => {
          setContent(newValue);
        }}
        value={content}
        init={{
          plugins:
            "preview powerpaste searchreplace autolink autosave directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table hr anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable formatpainter permanentpen pageembed charmap  quickbars linkchecker emoticons advtable export autoresize",
          style_formats: [
            { title: "Paragraph", format: "p" },
            { title: "Heading 2", format: "h2" },
            { title: "Heading 3", format: "h3" },
          ],
          menubar: "",
          toolbar:
            "undo redo | styles | bold italic underline strikethrough | numlist bullist | emoticons image media link codesample | preview fullscreen",
          placeholder: "Nhập nội dung bài viết...",
          quickbars_selection_toolbar:
            "styles | bold italic blockquote | quicklink quickimage quicktable | numlist bullist",
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:16px; font-weight:400;color:#444746; }",
        }}
      />
    </div>
  );
}
