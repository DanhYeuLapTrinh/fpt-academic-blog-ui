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
import useHome from "../../../hooks/useHome";

export default function Home(props) {
  const { userAccounts } = useHome();
  return (
    <div style={{ position: "relative" }}>
      <BackToTopButton />
      <Container>
        <TrendingList trendingPostsHome={props.trendingPostsHome} />
        <SearchSection />
      </Container>
      <LatestPostSection latestPosts={props.latestPosts} />
      <RewardedPostList />
      <Container>
        <Grid2 container xs={12} columnGap={"20px"}>
          <Grid2 item xs={8}>
            <QAList qaList={props.qaList} />
            {userAccounts && <PostList />}
          </Grid2>
          <Grid2 item xs>
            <Stack spacing={12}>
              <TrendingTagSection trendingTags={props.trendingTags} />
              {props.shortPosts && <ShortList shortPosts={props.shortPosts} />}
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
