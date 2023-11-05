import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";

export default function UserStory(props) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "secondary.alt",
        borderRadius: "10px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Text fontSize="23px">Giới thiệu</Text>
      <TextField
        fullWidth
        multiline
        disabled={!props.isEditing}
        value={props.editedStory}
        onChange={(e) => props.setEditedStory(e.target.value)}
        placeholder="Nhập mô tả về bạn"
        variant={props.isEditing ? "outlined" : "standard"}
        autoFocus
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: {
            textAlign: "center",
            minHeight: props.isEditing ? "100px" : "auto",
          },
        }}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#444746",
          },
        }}
      />
      {!props.isEditing && (
        <Stack sx={{ border: "1px solid #c3c3c3", borderRadius: "5px" }}>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => props.setIsEditing(true)}
          >
            <Text>Chỉnh sửa tiểu sử</Text>
          </Button>
        </Stack>
      )}
      {props.isEditing && (
        <Stack direction={"row"} justifyContent={"flex-end"}>
          <Button onClick={props.handleSave}>Lưu</Button>
          <Button onClick={props.handleCancel}>Hủy</Button>
        </Stack>
      )}
    </Box>
  );
}
