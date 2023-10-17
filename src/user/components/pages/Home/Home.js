import React from "react";
import { Container } from "@mui/material";
import TrendingList from "../../templates/TrendingList/TrendingList";
import SearchSection from "../../organisms/SearchSection/SearchSection";
import LatestPostSection from "../../organisms/LatestPostSection/LatestPostSection";
import RewardedPostList from "../../templates/RewardedPostList/RewardedPostList";
import QA from "../../organisms/QA/QA";



export default function Home() {
  return (
   <div>
      <Container>
        <TrendingList/>
        <SearchSection/>
      </Container>
      <LatestPostSection/>
      <RewardedPostList/>
      <QA/>
   </div>
  );
}
