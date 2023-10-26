import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";

export default function TitleField() {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [focus, setFocus] = useState(false);
  const maxCharLimit = 100;

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputValue(text);
    setCharCount(text.length);
  };

  return (
    <Stack>
      <TextField
        variant="standard"
        placeholder="Nhập tiêu đề bài viết..."
        fullWidth
        spellCheck={false}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "40px",
            fontWeight: "600",
            color: "text.main",
          },
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        multiline
        value={inputValue}
        onChange={handleInputChange}
      />
      <Box sx={{ alignSelf: "flex-end", p: "0 15px 20px 0" }}>
        {charCount >= maxCharLimit && (
            <Typography
              variant="caption"
              color="error"
              fontWeight="600"
              fontSize="14px"
            >
              Tiêu đề không được dài hơn 100 ký tự
            </Typography>
        )}
        {focus && charCount < maxCharLimit ? (
          <Text
            variant="caption"
            color="primary.main"
            fontWeight="600"
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
