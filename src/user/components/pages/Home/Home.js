import React from "react";
import { Container, Stack } from "@mui/material";
import TrendingList from "../../templates/TrendingList/TrendingList";
import SearchSection from "../../organisms/SearchSection/SearchSection";
import LatestPostSection from "../../organisms/LatestPostSection/LatestPostSection";
import RewardedPostList from "../../templates/RewardedPostList/RewardedPostList";
import QAList from "../../templates/QAList/QAList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TrendingTagSection from "../../organisms/TrendingTagSection/TrendingTagSection";
import ShortList from "../../templates/ShortList/ShortList";
import PostList from "../../templates/PostList/PostList";
import BackToTopButton from "../../atoms/BackToTopButton/BackToTopButton";

export default function Home({ qaList, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <BackToTopButton />
      <Container>
        <TrendingList trendingPosts={props.trendingPosts} />
        <SearchSection />
      </Container>
      <LatestPostSection latestPosts={props.latestPosts} />
      <RewardedPostList />
      <Container>
        <Grid2
          container
          md={12}
          columnGap={"20px"}
          direction={{ md: "column", lg: "row" }}
        >
          <Grid2 item sm={12} md={12} lg={8}>
            <QAList qaList={qaList} />
          </Grid2>
          <Grid2 item sm={12} md={12} lg>
            <Stack spacing={12}>
              <TrendingTagSection trendingTags={props.trendingTags} />
              <ShortList shortPosts={props.shortPosts} />
            </Stack>
          </Grid2>
        </Grid2>
        <PostList qaList={qaList} />
      </Container>
    </div>
  );
}
