import { Container, FormControl, MenuItem, Select, Stack } from "@mui/material";
import React from "react";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import { getFirstChar } from "../../../utils/StringMethod";
import useManagePost from "../../../hooks/useManagePost";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../../atoms/Text/Text";
export default function PendingPosts(props) {
  const { pendingPosts, sort, setSort, amount } =
    useManagePost();
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px)" }}>
      <Stack
        spacing={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
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
        <Text fontSize="13px">Đang chờ: {amount}</Text>
      </Stack>
      <Stack p={"20px 0"}>
        {props?.pendingPosts?.map((item) => (
          <RewardedPostsUnder
            key={item.postId}
            url={item.coverURL}
            postPath={item.slug}
            title={item.title}
            description={item.description}
            avatar={item.avatarURL}
            label={item.accountName}
            major={getFirstChar(item.category[0])}
            subject={item.category[1]}
            tag={item.tag}
            time={item.dateOfPost}
            postId={item.postId}
          />
        ))}
      </Stack>
    </Container>
  );
}
