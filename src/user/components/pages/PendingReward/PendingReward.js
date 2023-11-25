import { Container, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";
export default function PendingReward({ pendingReward }) {
  let sortedPendingReward = pendingReward?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px - 30px)" }}>
      <SectionTitle title="Danh sách chờ xét thưởng" />
      {sortedPendingReward?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      <Stack spacing={"20px"} mb={"300px"}>
        {sortedPendingReward?.map((item) => (
          <RewardedPostsUnder
            key={item.postId}
            userId={item.userId}
            url={item.coverURL}
            postPath={item.slug}
            title={item.title}
            description={item.description}
            avatar={item.avatarURL}
            label={item.accountName}
            majorName={item?.category[0]?.categoryName}
            majorID={item?.category[0]?.categoryId}
            subjectName={item?.category[2]?.categoryName}
            subjectID={item?.category[2]?.categoryId}
            tagName={item?.tag.tagName}
            tagID={item?.tag.tagId}
            time={item.dateOfPost}
            postId={item.postId}
            slug={"/pending-reward/" + item.slug}
          />
        ))}
      </Stack>
    </Container>
  );
}
