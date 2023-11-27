import { Container, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";

export default function Favorite({ favorite }) {
  return (
    <Container sx={{ pt: "37px", minHeight: "calc(120vh - 93px)" }}>
      <SectionTitle title="Mục yêu thích" />
      {favorite?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      <Stack spacing={"20px"} pb={"20px"}>
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
            draft
            favorite
            tagColor="secondary.main"
          />
        ))}
      </Stack>
    </Container>
  );
}
