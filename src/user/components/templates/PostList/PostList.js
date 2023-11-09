import React, { useState } from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import { Box, Stack } from "@mui/material";
import Post from "../../organisms/Post/Post";
import { getFirstChar } from "../../../utils/StringMethod";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Text from "../../atoms/Text/Text";

export default function PostList() {
  const axiosPrivate = useAxiosPrivate();
  const fetchData = async (page, postsPerPage) => {
    let response = await axiosPrivate.post(process.env.REACT_APP_ALL_POSTS, {
      page: page,
      postOfPage: postsPerPage,
    });
    return { post: [...response?.data], prevOffset: page };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam, 5),
    getNextPageParam: (lastPage) => {
      // so sánh nếu số post trên web hiển thị nhiều hơn số post tổng thì return false dừng call api
      return lastPage.prevOffset + 1;
    },
  });
  const posts = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.post];
  }, []);

  return (
    <Box width={"740px"} sx={{ marginTop: "59px" }}>
      <SectionTitle title="Bài viết" />
      <InfiniteScroll
        dataLength={posts ? posts.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <Stack width={"100%"} sx={{ textAlign: "center", m: "20px 0" }}>
            <Text>...đang tải...</Text>
          </Stack>
        }
      >
        {posts?.map((item, index) => (
          <Post
            key={index}
            url={item?.coverURL}
            title={item?.title}
            description={item?.description}
            author={item?.accountName}
            src={item?.avatarURL}
            time={item?.dateOfPost}
            majorName={item?.category[0]?.categoryName}
            majorID={item?.category[0]?.categoryId}
            subjectName={item?.category[2]?.categoryName}
            subjectID={item?.category[2]?.categoryId}
            tagName={item?.tag.tagName}
            tagID={item?.tag.tagId}
            slug={item?.slug}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
}
