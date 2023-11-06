import { Stack } from "@mui/material";
import React from "react";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
export default function PendingPosts(props) {
  return (
    <Stack p={"20px 0"}>
      {props?.pendingPosts?.map((item) => (
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
          slug={"/pending-posts/" + item.slug}
        />
      ))}
    </Stack>
  );
}
