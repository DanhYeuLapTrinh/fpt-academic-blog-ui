import { Stack } from "@mui/material";
import React from "react";
import PostTag from "../../atoms/PostTag/PostTag";
import { Link } from "react-router-dom";
import { toSlug } from "../../../utils/StringMethod";

export default function TrendingTagList(props) {
  return (
    <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
      {props?.trendingTags?.slice(0, 12)?.map((tag, index) => (
        <Link
          to={{
            pathname: "/categories",
            search: `?name=${toSlug(tag.categoryName, true)}&id=${
              tag.categoryId
            }`,
          }}
          style={{textDecoration: "none"}}
        >
          <PostTag
            key={index}
            text={tag.categoryName}
            padding="4px"
            bgcolor="secondary.alt"
            color="primary.main"
            borderRadius="5px"
            fontSize="13px"
          />
        </Link>
      ))}
    </Stack>
  );
}
