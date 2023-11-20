import { Container, Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import QA from "../../organisms/QA/QA";
import { timeConverter } from "../../../utils/StringMethod";

export default function Tags(props) {
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
      {props.data ? (
        <>
          <Stack
            direction={"row"}
            spacing={1}
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={1} alignItems={"baseline"}>
              <Text fontSize="18px">Nằm trong: </Text>
              <SectionTitle
                width="auto"
                fontWeight="bold"
                fontSize="24px"
                color="primary.main"
                title={`#${props.name}`}
              />
            </Stack>
            <Text fontSize="13px">Tổng số bài viết: {props.amount}</Text>
          </Stack>
          <Stack spacing={"20px"}>
            {props.data?.map((item, index) => {
              if (item?.tag?.tagName !== "Q&A") {
                return (
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
                );
              } else {
                return (
                  <QA
                    slug={`/view/${item.slug}`}
                    label={item.accountName}
                    src={item.avatarURL}
                    time={timeConverter(item.dateOfPost)}
                    title={item.title}
                    description={item.description}
                    vote={item.numOfUpVote - item.numOfDownVote}
                    text={item.numberOfComment}
                    majorName={item?.category[0]?.categoryName}
                    majorID={item?.category[0]?.categoryId}
                    subjectName={item?.category[2]?.categoryName}
                    subjectID={item?.category[2]?.categoryId}
                    tagName={item?.tag.tagName}
                    tagID={item?.tag.tagId}
                    isRewarded={item?.is_rewarded}
                    rewarder={item?.rewarder}
                    userId={item?.userId}
                  />
                );
              }
            })}
          </Stack>
        </>
      ) : null}
    </Container>
  );
}
