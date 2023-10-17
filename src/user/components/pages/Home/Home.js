import React from "react";
import { Container, Stack } from "@mui/material";
import TrendingList from "../../templates/TrendingList/TrendingList";
import SearchSection from "../../organisms/SearchSection/SearchSection";



export default function Home() {
  return (
    <Container>
      <TrendingList/>
      <SearchSection/>
    </Container>
  );
}
