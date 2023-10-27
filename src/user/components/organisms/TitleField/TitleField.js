import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../atoms/Text/Text";

export default function TitleField() {
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [focus, setFocus] = useState(false);
  const maxCharLimit = 100;

  const handleInputChange = (event) => {
    setTitle(event.target.value);
    setCharCount(event.target.value.length);
  };

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("title", JSON.stringify(title));
    }, 5000);
  }, [title]);

  useEffect(() => {
    setTitle(JSON.parse(localStorage.getItem("title")));
  }, []);

  return (
    <Stack sx={{minHeight: '100px'}}>
      <TextField
        variant="standard"
        placeholder="Nhập tiêu đề bài viết..."
        fullWidth
        spellCheck={false}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "44px",
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
      <Box sx={{ alignSelf: "flex-end", pr: '15px'}}>
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
