import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import { Box } from "@mui/material";
import Post from "../../organisms/Post/Post";
import { getFirstChar } from "../../../utils/StringMethod";

export default function PostList(props) {
  return (
    <Box width={"740px"} sx={{ marginTop: "59px" }}>
      <SectionTitle title="Bài viết" filter post />
      {props.allPosts?.map((item, index) => (
        <Post
          url={item?.coverURL}
          title={item?.title}
          description={item?.description}
          author={item?.accountName}
          src={item?.avatarURL}
          time={item?.dateOfPost}
          major={getFirstChar(item?.category[0])}
          subject={item?.category[1]}
          tag={item?.tag}
          slug={item?.slug}
        />
      ))}
    </Box>
  );
}
