import React from "react";
import NavListContainer from "../../molecules/Navigation/NavListContainer";
import UserTab from "../../molecules/UserTab/UserTab";
import { Box, Container, Divider, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function Header() {
  return (
    <Container sx={{ padding: "15px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
        >
          <Text fontFamily="Klavika" color="primary.main" fontSize="42px">
            fblog
          </Text>
          <Divider orientation="vertical" sx={{ height: "25px" }} />
          <NavListContainer />
        </Stack>
        <UserTab />
      </Stack>
    </Container>
  );
}
