import { Container, Divider } from "@mui/material";
import React from "react";
import RewardedPostTop from "../../organisms/RewardedPosts/RewardedPostTop/RewardedPostTop";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";

export default function RewardedPostList() {
  return (
    <Container sx={{ marginBottom: "59px" }}>
      <SectionTitle title="Lựa chọn bởi giảng viên"/>
      <RewardedPostTop />
      <RewardedPostsUnder />
      <Divider
        sx={{ width: "100%", paddingTop: "20px" }}
        orientation="horizontal"
      />
      <RewardedPostsUnder />
      <Divider
        sx={{ width: "100%", paddingTop: "20px" }}
        orientation="horizontal"
      />
      <RewardedPostsUnder />
      <Divider
        sx={{ width: "100%", paddingTop: "20px" }}
        orientation="horizontal"
      />
      <RewardedPostsUnder />
    </Container>
  );
}
