import React from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import SearchBarTop from "../../molecules/SearchBarTop/SearchBarTop";
import SearchBarBottom from "../../molecules/SearchBarBottom/SearchBarBottom";
import { Stack } from "@mui/material";
import SearchBarService from "../../molecules/SearchBar/SearchBarService";
export default function SearchSection() {
  return (
    <Stack
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      spacing={"30px"}
      margin={'110px 0'}
    >
      <SearchBarTop />
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        spacing={"12px"}
      >
        <SearchBarService/>
        <SearchBarBottom />
      </Stack>
    </Stack>
  );
}
//
