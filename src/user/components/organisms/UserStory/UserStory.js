import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";
import useAuth from "../../../hooks/useAuth";

export default function UserStory(props) {
  const auth = useAuth();
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "120px",
        bgcolor: "secondary.alt",
        borderRadius: "10px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text fontSize="23px" mb={2}>
        Giới thiệu
      </Text>
      <TextField
        fullWidth
        multiline
        disabled={!props.isEditing}
        value={props.editedStory}
        onChange={props.handleInputChange}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
        placeholder={
          props.userId === auth.id
            ? "Nhập miêu tả về bạn"
            : "Người dùng chưa có tiểu sử"
        }
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
      <Box sx={{ p: "5px 10px 0 0", mb: 2, alignSelf: "flex-end" }}>
        {props.charCount >= props.maxCharLimit && (
          <Typography
            variant="caption"
            fontWeight="400"
            fontSize="12px"
            color="error"
          >
            100/100 ký tự
          </Typography>
        )}
        {props.charCount < props.maxCharLimit && props.isEditing && (
          <Text variant="caption" fontWeight="400" fontSize="12px">
            {props.charCount}/{props.maxCharLimit} ký tự
          </Text>
        )}
      </Box>
      {!props.isEditing && props.userId === auth.id && (
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
