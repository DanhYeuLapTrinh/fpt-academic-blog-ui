import React from "react";
import { Container, Stack } from "@mui/material";
import SearchBar from "../../molecules/SearchBar/SearchBar";

export default function Filter() {
  return (
    <Container sx={{mt: "37px"}}>
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        spacing={"12px"}
        width="100%"
      >
        <SearchBar width="100%" />
      </Stack>
    </Container>
  );
}
