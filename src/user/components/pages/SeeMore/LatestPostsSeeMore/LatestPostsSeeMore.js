import { Container } from "@mui/material";
import React from "react";
import SectionTitle from "../../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";

export default function LatestPostsSeeMore(props) {
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <SectionTitle title="Bài viết mới nhất" />
      {props.data?.map((item, index) => (
        <RewardedPostsUnder
          key={index}
          url={item?.coverURL}
          title={item?.title}
          description={item?.description}
          time={item?.dateOfPost}
          avatar={item?.avatarURL}
          label={item?.accountName}
          majorName={item?.category[0]?.categoryName}
          majorID={item?.category[0]?.categoryId}
          subjectName={item?.category[2]?.categoryName}
          subjectID={item?.category[2]?.categoryId}
          tagName={item?.tag.tagName}
          tagID={item?.tag.tagId}
          isRewarded={item?.is_rewarded}
          slug={"/view/" + item.slug}
          userId={item?.userId}
        />
      ))}
    </Container>
  );
}