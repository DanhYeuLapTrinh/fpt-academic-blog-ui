import { Paper } from "@mui/material";
import React from "react";
import Text from "../Text/Text";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function RewardBadge(props) {
  const configBadge = {
    ...props,
  };
  return (
    <Paper
      sx={{
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: props.small ? "center" : "space-between",
        width: props.small ? "40px" : "140px",
        height: props.small ? "40px" : "42px",
        p: "8px 10px",
        ...configBadge,
      }}
    >
      {!props.small && (
        <Text lineHeight="13px" fontSize="13px" color="secondary.main">
          KHUYẾN NGHỊ
        </Text>
      )}
      <VerifiedIcon
        sx={{ fontSize: props.small ? "20px" : "22px", color: "golden.main" }}
      />
    </Paper>
  );
}
