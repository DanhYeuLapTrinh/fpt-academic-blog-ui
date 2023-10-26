import React from 'react'
import { Icon } from "@iconify/react";
import Text from "../Text/Text";
import { Stack } from "@mui/material";
export default function ImageClick() {
  return (
    <Stack alignItems={"center"} spacing={1}>
      <Icon icon="bx:image-add" width="55" color="#757575" />
      <Stack alignItems={"center"} spacing={'1px'}>
        <Text fontWeight="400" color="middleText.main" fontSize="11px" lineHeight="14px">
          Nhấn để thêm ảnh đại diện
        </Text>
        <Text fontWeight="400" color="middleText.main" fontSize="11px" lineHeight="14px">
          Hoặc kéo và thả
        </Text>
      </Stack>
    </Stack>
  )
}
