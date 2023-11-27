import React from "react";
import { Box, Container, Stack } from "@mui/material";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import useHome from "../../../hooks/useHome";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import QA from "../../organisms/QA/QA";
import { timeConverter } from "../../../utils/StringMethod";

export default function Filter({ accountName, setAccountName }) {
  const { searchPost } = useHome();
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        width="100%"
        pb={"20px"}
      >
        <SearchBar
          accountName={accountName}
          setAccountName={setAccountName}
          width="100%"
        />
      </Stack>
      <SectionTitle title="Bài viết liên quan" />
      {searchPost?.length === 0 && (
        <Stack
          width={"100%"}
          height={"100%"}
          mt={"150px"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="80px"
            viewBox="0 0 640 512"
            fill="#c3c3c3"
          >
            <path d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z" />
          </svg>
          <Box sx={{ width: "250px", textAlign: "center" }}>
            <Text color="lightText.main" fontSize="16px" fontWeight="400">
              Hiện chưa có bài viết nào thuộc nội dung bạn đã tìm kiếm
            </Text>
          </Box>
        </Stack>
      )}
      <Stack spacing={"20px"} pb={"20px"}>
        {searchPost?.map((item) => {
          if (item.tag.tagName !== "Q&A") {
            return (
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
              />
            );
          }
        })}
      </Stack>
    </Container>
  );
}
