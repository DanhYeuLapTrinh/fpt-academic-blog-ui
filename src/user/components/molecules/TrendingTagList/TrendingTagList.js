import { Stack } from "@mui/material";
import React from "react";
import PostTag from "../../atoms/PostTag/PostTag";

export default function TrendingTagList(props) {
  return (
    <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
      {props?.trendingTags?.slice(0, 12)?.map((tag, index) => (
        <PostTag
          key={index}
          text={tag.categoryName}
          link={`/categories/${tag.categoryId}`}
          padding="4px"
          bgcolor="secondary.alt"
          color="primary.main"
          borderRadius="5px"
          fontSize="13px"
        />
      ))}
    </Stack>
  );
}
