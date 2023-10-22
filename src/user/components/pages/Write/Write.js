import React from "react";
import { Box, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import useAuth from "../../../hooks/useAuth";
import SelectOption from "../../atoms/SelectOption/SelectOption";
import Text from "../../atoms/Text/Text";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
export default function Write() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken()
  console.log(auth)
  return (
    <Container sx={{ p: "30px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <PostFilter />
        <button onClick={refresh}>Click</button>
        {/* <SelectOption/> */}
      </Stack>
      
    </Container>
  );
}
