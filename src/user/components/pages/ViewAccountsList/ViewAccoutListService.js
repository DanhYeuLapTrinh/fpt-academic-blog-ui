import React, { useEffect, useState } from "react";
import ViewAccountList from "./ViewAccountList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Container, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useHome from "../../../hooks/useHome";
import SearchBar from "../../molecules/SearchBar/SearchBar";

export default function ViewAccoutListService() {
  const axiosPrivate = useAxiosPrivate();
  const { users, setUsers, setAccountName, accountName } = useHome();
  const { id } = useParams();
  const auth = useAuth();
  let hasMoreUsers = true;
  useEffect(() => {
    setAccountName(id);
  }, [id]);

  const fetchData = async (page, usersOfPage) => {
    let response = await axiosPrivate.post(
      process.env.REACT_APP_SEARCH_ACCOUNT,
      {
        page: page,
        usersOfPage: usersOfPage,
        search: accountName,
      }
    );
    return { users: [...response?.data], prevOffset: page };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam, 10),
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset * 5 >= lastPage.users.length) {
        hasMoreUsers = false;
      }
      return lastPage.prevOffset + 1;
    },
  });

  let user = data?.pages?.reduce((acc, page) => {
    return [...acc, ...page.users];
  }, [])
  useEffect(() => {
    console.log(user)
  }, [user])

  const followAccount = async (inputId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: inputId,
        }
      );
      if (response) {
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === inputId
              ? {
                  ...user,
                  followStatus: true,
                  numOfFollower: user.numOfFollower + 1,
                }
              : user
          )
        );
      }
    } catch (error) {}
  };

  const unfollowAccount = async (inputId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_UNFOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: inputId,
        }
      );
      if (response) {
        setUsers((prev) =>
          prev.map((user) =>
            user.userId === inputId
              ? {
                  ...user,
                  followStatus: false,
                  numOfFollower: user.numOfFollower - 1,
                }
              : user
          )
        );
      }
    } catch (error) {}
  };
  return (
    <Container>
      <Box mb={"20px"}>
        <SearchBar
          accountName={accountName}
          setAccountName={setAccountName}
          width="100%"
        />
      </Box>
      <InfiniteScroll
        dataLength={users ? users.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          hasMoreUsers && (
            <Stack width={"100%"} sx={{ textAlign: "center", m: "20px 0" }}>
              <Text>...đang tải...</Text>
            </Stack>
          )
        }
        style={{ marginBottom: "20px" }}
      >
        <ViewAccountList
          followAccount={followAccount}
          unfollowAccount={unfollowAccount}
          users={user}
        />
      </InfiniteScroll>
    </Container>
  );
}
