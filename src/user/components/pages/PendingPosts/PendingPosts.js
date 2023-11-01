import {
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../../atoms/Text/Text";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";
import { getFirstChar } from "../../../utils/StringMethod";

export default function PendingPosts(props) {
  return (
    <Container sx={{ mt: "30px", minHeight: "calc(100vh - 93px)" }}>
      <Stack spacing={1} direction={"row"} alignItems={'center'} justifyContent={'space-between'}>
        <Stack spacing={1} direction={"row"}>
          <FormControl>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={props.type}
              onChange={(e) => props.setType(e.target.value)}
            >
              <MenuItem value="Bài viết đang chờ">
                <Text fontSize="14px">Bài viết đang chờ</Text>
              </MenuItem>
              <MenuItem value="Bài viết đã phê duyệt">
                <Text fontSize="14px">Bài viết đã phê duyệt</Text>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={props.sort}
              onChange={(e) => props.setSort(e.target.value)}
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
        <Text paddingLeft="10px" fontSize="14px" fontWeight="500">Đang chờ: {props.amount}</Text>
      </Stack>
      {props.type === "Bài viết đang chờ" ? (
        <Stack spacing={"20px"} p={"20px 0"}>
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
      ) : (
        <Stack spacing={"20px"} p={"20px 0"}>
          {props?.approvedPosts?.map((item) => (
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
      )}
    </Container>
  );
}
