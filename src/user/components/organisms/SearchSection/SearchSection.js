import React from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import SearchBarTop from "../../molecules/SearchBarTop/SearchBarTop";
import SearchBarBottom from "../../molecules/SearchBarBottom/SearchBarBottom";
import { Stack } from "@mui/material";
export default function SearchSection() {
  return (
    <Stack
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      spacing={"30px"}
      margin={'70px 0'}
    >
      <SearchBarTop />
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        spacing={"12px"}
      >
        <SearchBar />
        <SearchBarBottom />
      </Stack>
    </Stack>
  );
}
//
