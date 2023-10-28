import React from "react";
import UserTab from "../../molecules/UserTab/UserTab";
import { Box, Container, Divider, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import NavList from "../../molecules/Navigation/NavList";
import UserMenuContainer from "../../molecules/UserMenu/UserMenuContainer";

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
          <Link to={"/"}>
            <Text fontFamily="Klavika" color="primary.main" fontSize="42px">
              fblog
            </Text>
          </Link>
          <Divider orientation="vertical" sx={{ height: "25px" }} />
          <NavList />
        </Stack>
        <UserTab />
      </Stack>
    </Container>
  );
}
