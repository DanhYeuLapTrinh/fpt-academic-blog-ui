import React from "react";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import InformationDetail from "../../organisms/UserDetail/InformationDetail";

function UserDetail() {
  const { id } = useParams();
  const { getUserById } = useUserContext();

  const user = getUserById(id);

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Container>
          <Typography variant="h6">
            Không tìm thấy hồ sơ người dùng này
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      <Container className="container">
        <TitleHeader title="Hồ sơ" />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            This is Avatar
          </Grid>

          <Grid item xs={12} md={8}>
            <InformationDetail />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserDetail;
