import { Container, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import Text from "../../atoms/Text/Text";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";

export default function Skills(props) {
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
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
              title={props.id === "c-sharp" ? "c#" : props.id}
            />
          </Stack>
          <Text fontSize="13px">Tổng số bài viết: {props?.data?.length}</Text>
        </Stack>
        {props.data && props.data.length === 0 && (
          <Stack>
            <EmptyDisplay alignSelf="center" mt="140px" />
          </Stack>
        )}
        <Stack spacing={"20px"}>
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
        </Stack>
      </>
    </Container>
  );
}
