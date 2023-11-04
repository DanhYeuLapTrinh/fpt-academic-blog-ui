import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function ViewProfile(props) {
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          height: props.height,
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          position: "relative",
          zIndex: 1,
        }}
      ></Box>
    </Container>
  );
}
