import React from "react";
import { Container, FormControl, MenuItem, Select, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../../atoms/Text/Text";
import useManagePost from "../../../hooks/useManagePost";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";
export default function Draft({ removePost, removeDraft, draft, declined }) {
  const { sort, setSort, draftType, setDraftType } = useManagePost();
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pb={"20px"}
      >
        <Stack direction={"row"} spacing={1}>
          <FormControl>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={draftType}
              onChange={(e) => setDraftType(e.target.value)}
            >
              <MenuItem value="Nháp">
                <Text fontSize="14px">Nháp</Text>
              </MenuItem>
              <MenuItem value="Bài viết bị từ chối">
                <Text fontSize="14px">Bài viết bị từ chối</Text>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="Mới nhất">
                <Text fontSize="14px">Mới nhất</Text>
              </MenuItem>
              <MenuItem value="Cũ nhất">
                <Text fontSize="14px">Cũ nhất</Text>
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      {draftType === "Nháp" && draft?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      <Stack spacing={"20px"}>
        {draftType === "Nháp" &&
          draft?.map((item) => (
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
              slug={"/edit-draft/" + item.slug}
              draft
              tagColor="secondary.main"
              removeDraft={removeDraft}
            />
          ))}
      </Stack>
      {draftType === "Bài viết bị từ chối" && declined?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      <Stack spacing={"20px"}>
        {draftType === "Bài viết bị từ chối" &&
          declined?.map((item) => (
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
              slug={"/edit-draft/" + item.slug}
              draft
              declined
              removePost={removePost}
              tagColor="secondary.main"
            />
          ))}
      </Stack>
    </Container>
  );
}
