import { Stack } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import React from "react";
import Text from "../Text/Text";
import { Link } from "react-router-dom";

export default function SeeAllButton() {
  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
        <Text color="primary.main" fontSize="14px">
          Xem tất cả
        </Text>
        <ArrowForwardRoundedIcon
          sx={{ width: "14px", height: "14px", color: "primary.main" }}
        />
      </Stack>
    </Link>
  );
}
