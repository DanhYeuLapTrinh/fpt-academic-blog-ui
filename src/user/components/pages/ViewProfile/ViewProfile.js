import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function ViewProfile(props) {
  let imgURL = props.url ?? "/assets/img/blank-cover.jpg";
  let avatarURL = props.avatarURL ?? "/assets/img/blank.png";
  return (
    <Container sx={{ minHeight: "calc(100vh - 93px)" }}>
      <Box
        sx={{
          width: "100%",
          height: props.height,
          backgroundImage: `url(${imgURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "0 0 10px 10px",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "184px",
            height: "184px",
            backgroundImage: `url(${avatarURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            border: "3px solid white",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        />
      </Box>
      {props.accountName}
    </Container>
  );
}
