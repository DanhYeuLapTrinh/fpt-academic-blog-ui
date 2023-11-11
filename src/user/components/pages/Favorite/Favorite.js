import { Container } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";

export default function Favorite({ favorite }) {
  return (
    <Container sx={{ pt: "37px" }}>
      <SectionTitle title="Mục yêu thích" />
      {favorite?.map((item) => (
        <RewardedPostsUnder
          key={item.postListDto.postId}
          userId={item.postListDto.userId}
          url={item.postListDto.coverURL}
          postPath={item.postListDto.slug}
          title={item.postListDto.title}
          description={item.postListDto.description}
          avatar={item.postListDto.avatarURL}
          label={item.postListDto.accountName}
          majorName={item.postListDto?.category[0]?.categoryName}
          majorID={item.postListDto?.category[0]?.categoryId}
          subjectName={item.postListDto?.category[2]?.categoryName}
          subjectID={item.postListDto?.category[2]?.categoryId}
          tagName={item.postListDto?.tag.tagName}
          tagID={item.postListDto?.tag.tagId}
          time={item.saveAt}
          postId={item.postListDto.postId}
          slug={"/view/" + item.postListDto.slug}
        />
      ))}
    </Container>
  );
}
