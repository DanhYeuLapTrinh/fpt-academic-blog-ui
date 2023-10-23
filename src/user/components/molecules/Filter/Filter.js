import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
export default function Filter(props) {
  return (
    <Box
      sx={{ border: "1px solid #c3c3c3", borderRadius: "5px", width: props.post ?"237px":"258px" }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text fontSize="12px" padding="0 6px">
            Mới nhất
          </Text>
        </Link>
        <Divider orientation="vertical" sx={{ height: "15px" }} />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text fontSize="12px" padding="0 6px">
            {props.post ? "Cũ nhất" : "Chưa trả lời"}
          </Text>
        </Link>
        <Divider orientation="vertical" sx={{ height: "15px" }} />
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text fontSize="12px" padding="0 6px">
            Tương tác cao nhất
          </Text>
        </Link>
      </Stack>
    </Box>
  );
}
