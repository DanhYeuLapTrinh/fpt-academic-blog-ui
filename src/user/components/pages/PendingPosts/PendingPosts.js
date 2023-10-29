import {
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Text from "../../atoms/Text/Text";
import RewardedPostsUnder from "../../organisms/RewardedPosts/RewardedPostsUnder/RewardedPostsUnder";

export default function PendingPosts(props) {
  return (
    <Container sx={{ mt: "30px" }}>
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
      {props.type === "Bài viết đang chờ"
        ? props?.pendingPosts?.map((item) => (
            <RewardedPostsUnder
              key={item.postId}
              url={item.coverURL}
              title={item.title}
              description={item.description}
              avatar={item.avatarURL}
              label={item.accountName}
              major={item.category[0]}
              subject={item.category[1]}
              tag={item.tag}
            />
          ))
        : "Chưa có data"}
    </Container>
  );
}
