import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";

function AvatarDetail({ profileDetail, avatar }) {
  return (
    <Paper
      sx={{
        textAlign: "center",
        padding: "40px",
        position: "relative",
        borderRadius: 4,
      }}
    >
      <Box sx={{ height: 350 }}>
        <Avatar
          sx={{
            width: "150px",
            height: "150px",
            margin: "0 auto",
            border: "1px solid #ccc",
          }}
          src={avatar === null ? "/assets/img/blank.png" : avatar}
          alt="ảnh đại diện"
        />

        <Typography
          sx={{
            mt: 2,
            width: "100%",
            padding: "10px 0",
            background: "#fff",
          }}
          variant="h4"
        >
          {profileDetail.fullname}
        </Typography>
      </Box>
    </Paper>
  );
}

export default AvatarDetail;
