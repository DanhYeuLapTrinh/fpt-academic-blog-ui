import React from "react";
import { Container, Stack } from "@mui/material";
import TrendingList from "../../templates/TrendingList/TrendingList";
import SearchSection from "../../organisms/SearchSection/SearchSection";
import LatestPostSection from "../../organisms/LatestPostSection/LatestPostSection";
import RewardedPostList from "../../templates/RewardedPostList/RewardedPostList";
import QA from "../../organisms/QA/QA";
import QAList from "../../templates/QAList/QAList";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Text from "../../atoms/Text/Text";
import Filter from "../../molecules/Filter/Filter";
import TrendingTagSection from "../../organisms/TrendingTagSection/TrendingTagSection";
import ShortList from "../../templates/ShortList/ShortList";
import PostList from "../../templates/PostList/PostList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("auth")
    navigate("/login")
  }
  return (
    <div>
      <Container>
        <button onClick={handleLogout} style={{color: 'red'}}>Log out</button>
        <TrendingList />
        <SearchSection />
      </Container>
      <LatestPostSection />
      <RewardedPostList />
      <Container>
        <Grid2 container xs={12} columnGap={"20px"}>
          <Grid2 item xs={8} sx={{ marginBottom: "59px" }}>
            <QAList />
            <PostList/>
          </Grid2>
          <Grid2 item xs>
            <Stack spacing={12}>
              <TrendingTagSection />
              <ShortList/>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
