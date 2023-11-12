import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../atoms/Text/Text";
import useContent from "../../../hooks/useContent";

export default function TitleField(props) {
  const { title, setTitle, charCount, setCharCount } = useContent();
  const [focus, setFocus] = useState(false);
  const maxCharLimit = 100;

  const handleInputChange = (event) => {
    setTitle(event.target.value);
    setCharCount(event.target.value.length);
  };

  useEffect(() => {
    if (!props.edited) {
      let content = JSON.parse(localStorage.getItem("content"));
      if (!content) content = {};
      content.title = title;
      localStorage.setItem("content", JSON.stringify(content));
    } else {
      let editedContent = JSON.parse(localStorage.getItem("editedContent"));
      if (!editedContent) editedContent = {};
      editedContent.title = title;
      localStorage.setItem("editedContent", JSON.stringify(editedContent));
    }
  }, [title]);

  return (
    <Stack sx={{ minHeight: "105px" }}>
      <TextField
        autoFocus
        variant="standard"
        placeholder={
          props.title
            ? "Nhập tiêu đề bài viết..."
            : "Nhập tiêu đề cho câu hỏi..."
        }
        fullWidth
        spellCheck={false}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "48px",
            fontWeight: "600",
            color: "text.main",
          },
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        multiline
        value={title}
        onChange={handleInputChange}
      />
      <Box sx={{ alignSelf: "flex-end", pr: "15px" }}>
        {charCount >= maxCharLimit && (
          <Typography
            variant="caption"
            color="error"
            fontWeight="500"
            fontSize="14px"
          >
            Tiêu đề không được dài hơn 100 ký tự
          </Typography>
        )}
        {focus && charCount < maxCharLimit ? (
          <Text
            variant="caption"
            color="primary.main"
            fontWeight="500"
            fontSize="14px"
          >
            {charCount}/{maxCharLimit} characters
          </Text>
        ) : (
          ""
        )}
      </Box>
    </Stack>
  );
}
