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
      avatar={<AvatarContentDetail avatar={props.avatar} />}
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
          {props.accountName}
        </Typography>
      }
      subheader={<Box>Đăng bài vào lúc: {props.dateOfPost}</Box>}
    />
  );
}

export default HeaderContentDetail;
