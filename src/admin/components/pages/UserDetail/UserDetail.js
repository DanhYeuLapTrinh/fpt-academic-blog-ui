import React, { useEffect, useState } from "react";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";

function UserDetail() {
  const { id } = useParams();

  const { getUserById } = useUserContext();

  const user = getUserById(id);

  return (
    <Box
      sx={{
        WebkitBoxFlex: 1,
        flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      <Container className="container">
        <TitleHeader title="Hồ sơ" />
      </Container>
    </Box>
  );
}

export default UserDetail;
