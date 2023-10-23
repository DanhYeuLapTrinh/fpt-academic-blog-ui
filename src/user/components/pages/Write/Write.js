import React from "react";
import { Box, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import useAuth from "../../../hooks/useAuth";
import SelectOption from "../../atoms/SelectOption/SelectOption";
import Text from "../../atoms/Text/Text";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import usePostTag from "../../../hooks/usePostTag";
export default function Write() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();
  const rftoken = localStorage.getItem("refreshToken");
  const { majorID, semesterID, subjectID, tagID } = usePostTag();
  return (
    <Container sx={{ p: "30px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <PostFilter />
        <button
          onClick={() => console.log(majorID, semesterID, subjectID, tagID)}
        >
          Click
        </button>
        <button
          onClick={() => {
            refresh()
            console.log("---------------------------------")
          }}
        >
          Refresh
        </button>
        {/* <SelectOption/> */}
      </Stack>
    </Container>
  );
}
