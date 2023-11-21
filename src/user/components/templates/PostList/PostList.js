import React, { useEffect, useState } from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import { Box, Skeleton, Stack } from "@mui/material";
import Post from "../../organisms/Post/Post";
import { getFirstChar } from "../../../utils/StringMethod";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Text from "../../atoms/Text/Text";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostList({ qaList }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const fetchData = async (page, postsPerPage) => {
    try {
      let response = await axiosPrivate.post(process.env.REACT_APP_ALL_POSTS, {
        page: page,
        postOfPage: postsPerPage,
      });
      return { ...response?.data, prevOffset: page };
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  let hasMorePosts = true;
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam, 5),
    getNextPageParam: (lastPage) => {
      if (lastPage?.prevOffset * 6 >= lastPage?.TotalPost) {
        hasMorePosts = false;
      }
      return lastPage?.prevOffset + 1;
    },
  });
  let posts;

  if (data && data.pages && data.pages.length > 0) {
    posts = data.pages.reduce((acc, page) => {
      return [...acc, ...(page?.Posts || [])];
    }, []);
  }
  return (
    <Box width={"740px"} sx={{ marginTop: "59px" }}>
      <SectionTitle title="Bài viết" />
      <InfiniteScroll
        dataLength={posts ? posts.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          qaList && hasMorePosts && (
            <Stack width={"100%"} sx={{ textAlign: "center", m: "20px 0" }}>
              <Text>...đang tải...</Text>
            </Stack>
          )
        }
        style={{ marginBottom: "20px" }}
      >
        <Stack spacing={"20px"}>
          {!qaList &&
            Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={740}
                    height={149}
                    sx={{ borderRadius: "10px" }}
                  />
                </div>
              ))}
        </Stack>
        {qaList &&
          posts?.map((item, index) => (
            <Post
              key={index}
              url={item?.coverURL}
              title={item?.title}
              description={item?.description}
              userId={item?.userId}
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
              isRewarded={item?.is_rewarded}
              small
            />
          ))}
      </InfiniteScroll>
    </Box>
  );
}
