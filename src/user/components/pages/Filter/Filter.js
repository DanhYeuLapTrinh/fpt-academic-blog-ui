import React from "react";
import { Container, Stack } from "@mui/material";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import useHome from "../../../hooks/useHome";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";

export default function Filter() {
  const { searchPost } = useHome();
  return (
    <Container sx={{ mt: "37px" }}>
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        spacing={"12px"}
        width="100%"
      >
        <SearchBar width="100%" />
      </Stack>
      {searchPost.postList?.map((item) => (
        <RewardedPostsUnder
          key={item?.postId}
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
