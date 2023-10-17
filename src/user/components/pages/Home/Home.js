import React from "react";
import { Container, Stack } from "@mui/material";
import TrendingList from "../../templates/TrendingList/TrendingList";
import SearchSection from "../../organisms/SearchSection/SearchSection";
import LatestPostSection from "../../organisms/LatestPostSection/LatestPostSection";



export default function Home() {
  return (
   <div>
      <Container>
        <TrendingList/>
        <SearchSection/>
      </Container>
      <LatestPostSection/>
   </div>
  );
}
