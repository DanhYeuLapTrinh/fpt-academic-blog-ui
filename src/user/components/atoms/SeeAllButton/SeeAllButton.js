import { IconButton, Stack } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import React from "react";
import Text from "../Text/Text";
import { Link } from "react-router-dom";

export default function SeeAllButton() {
  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
        <Text color="primary.main" fontSize="13px">
          Xem tất cả
        </Text>
        <ArrowForwardRoundedIcon
          sx={{ width: "12px", height: "12px", color: "primary.main" }}
        />
      </Stack>
    </Link>
  );
}
