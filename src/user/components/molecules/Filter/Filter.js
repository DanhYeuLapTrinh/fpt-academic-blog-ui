import React from "react";
import { Button, Divider, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
export default function Filter(props) {

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ border: "1px solid #c3c3c3", borderRadius: "5px" }}
    >
      <Button
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{ textTransform: "none" }}
      >
        <Text fontSize="12px" padding="0 6px">
          Mới nhất
        </Text>
      </Button>
      <Divider orientation="vertical" sx={{ height: "30px" }} />
      <Button
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{ textTransform: "none" }}
      >
        <Text fontSize="12px" padding="0 6px">
          {props.post ? "Cũ nhất" : "Chưa trả lời"}
        </Text>
      </Button>
      <Divider orientation="vertical" sx={{ height: "30px" }} />
      <Button
        disableFocusRipple
        disableRipple
        disableTouchRipple
        sx={{ textTransform: "none" }}
      >
        <Text fontSize="12px" padding="0 6px">
          Tương tác cao nhất
        </Text>
      </Button>
    </Stack>
  );
}
