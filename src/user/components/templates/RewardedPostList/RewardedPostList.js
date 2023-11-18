import { Box, Container, Divider, Stack } from "@mui/material";
import React from "react";
import RewardedPostTop from "../../organisms/RewardedPosts/RewardedPostTop/RewardedPostTop";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import useHome from "../../../hooks/useHome";
import { getFirstChar, sortByPropertyName } from "../../../utils/StringMethod";
import NormalPostSkeleton from "../../organisms/Skeleton/NormalPostSkeleton/NormalPostSkeleton";

export default function RewardedPostList() {
  const { rewardedPosts } = useHome();
  let sortedRewardedPosts = sortByPropertyName(rewardedPosts, "", "postId");
  return (
    <Container sx={{ marginBottom: "59px" }}>
      <SectionTitle title="Lựa chọn bởi giảng viên" see link="/rewarded" />
      <Box mb={"20px"}>
        <RewardedPostTop rewardedPosts={rewardedPosts} />
      </Box>
      {!rewardedPosts ? (
        Array(4)
          .fill(null)
          .map((_, i) => (
            <>
              <NormalPostSkeleton key={i} />
              {i < 3 && (
                <Divider sx={{ width: "100%" }} orientation="horizontal" />
              )}
            </>
          ))
      ) : (
        <Stack spacing={"20px"}>
          {sortedRewardedPosts?.map((item, index) => {
            if (index >= 1 && index <= 4) {
              return (
                <div key={index}>
                  {console.log(item.rewarder)}
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
                  {index < 4 && (
                    <Divider
                      sx={{ width: "100%", paddingTop: "20px" }}
                      orientation="horizontal"
                    />
                  )}
                </div>
              );
            }
          })}
        </Stack>
      )}
    </Container>
  );
}
