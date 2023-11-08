import { Box, CardHeader, Typography } from "@mui/material";
import React from "react";
import AvatarContentDetail from "../ContentDetail/AvatarContentDetail";

function HeaderContentDetail(props) {
  return (
    <CardHeader
      sx={{
        display: "flex",
        alignItems: "center",
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
      avatar={<AvatarContentDetail />}
      title={
        <Typography
          sx={{
            fontFamily: "Public Sans, sans-serif",
            margin: 0,
            lineHeight: 1.5,
            fontSize: "1rem",
            textDecoration: "none",
            color: "inherit",
          }}
          variant="subtitle1"
        >
          {props.fullName}
        </Typography>
      }
      subheader={<Box>08 Nov 2023</Box>}
    />
  );
}

export default HeaderContentDetail;
