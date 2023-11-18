import React from "react";
import { Container, Stack } from "@mui/material";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import useHome from "../../../hooks/useHome";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import QA from "../../organisms/QA/QA";
import { timeConverter } from "../../../utils/StringMethod";

export default function Filter() {
  const { searchPost, accountName, setAccountName } = useHome();
  let sortedSearchPost = [...searchPost?.postList, ...searchPost?.qaList];
  window.scrollTo(0, 0);
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        width="100%"
        mb={"20px"}
      >
        <SearchBar
          accountName={accountName}
          setAccountName={setAccountName}
          width="100%"
        />
      </Stack>
      <SectionTitle title="Bài viết liên quan" />
      {sortedSearchPost?.length === 0 && (
        <Stack
          width={"100%"}
          height={"100%"}
          mt={"80px"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          <Icon icon="mingcute:sad-line" color="#c3c3c3" width="180" />
          <Text color="lightText.main" fontSize="20px">
            Hiện chưa có bài viết nào thuộc nội dung bạn đã tìm kiếm
          </Text>
        </Stack>
      )}
      <Stack spacing={"20px"}>
        {sortedSearchPost?.map((item) => {
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
