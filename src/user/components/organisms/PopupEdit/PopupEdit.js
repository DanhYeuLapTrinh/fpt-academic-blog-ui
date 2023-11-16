import React from "react";
import Paper from "@mui/material/Paper";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
export default function PopupEdit(props) {
  return (
    <Paper
      sx={{
        m: "20px 0",
        p: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: props.bgcolor,
        borderRadius: "10px"
      }}
    >
      <Stack spacing={1}>
        <Text color={props.color} fontSize="30px">
          {props.label}
        </Text>
        <Text fontWeight="400" color={props.color}>
          {props.content}
        </Text>
      </Stack>
    </Paper>
  );
}
