import React from "react";
import { Icon } from "@iconify/react";
import Text from "../Text/Text";
import { Stack } from "@mui/material";
export default function ImageDrop() {
  return (
    <Stack alignItems={"center"} spacing={2}>
      <Icon icon="ri:drag-drop-line" width="50" color="#757575" />
      <Stack alignItems={"center"} spacing={'4px'}>
        <Text fontWeight="400" color="middleText.main" fontSize="14px" lineHeight="14px">
          Thêm ảnh đại diện
        </Text>
        <Text fontWeight="400" color="middleText.main" fontSize="14px" lineHeight="14px">
          Kéo và thả
        </Text>
      </Stack>
    </Stack>
  );
}
