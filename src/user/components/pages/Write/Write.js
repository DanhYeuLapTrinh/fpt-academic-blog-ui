import React from "react";
import { Box, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import useAuth from "../../../hooks/useAuth";
import SelectOption from "../../atoms/SelectOption/SelectOption";
import Text from "../../atoms/Text/Text";
export default function Write() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <Container sx={{ p: "30px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <PostFilter />
        {/* <SelectOption/> */}
      </Stack>
      
    </Container>
  );
}
