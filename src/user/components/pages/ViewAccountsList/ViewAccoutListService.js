import React, { useEffect, useState } from "react";
import ViewAccountList from "./ViewAccountList";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function ViewAccoutListService() {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const auth = useAuth();
  const fetchData = async (page, usersOfPage) => {
    let response = await axiosPrivate.post(
      process.env.REACT_APP_SEARCH_ACCOUNT,
      {
        page: page,
        usersOfPage: usersOfPage,
        search: id,
      }
    );
    return { users: [...response?.data], prevOffset: page };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam, 10),
    getNextPageParam: (lastPage) => {
      return lastPage.prevOffset + 1;
    },
  });

  useEffect(() => {
    setUsers(
      data?.pages.reduce((acc, page) => {
        return [...acc, ...page.users];
      }, [])
    );
  }, [data]);

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
    <InfiniteScroll
      dataLength={users ? users.length : 0}
      next={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={
        <Stack width={"100%"} sx={{ textAlign: "center", m: "20px 0" }}>
          <Text>...đang tải...</Text>
        </Stack>
      }
      style={{ marginBottom: "20px" }}
    >
      <ViewAccountList
        users={users}
        followAccount={followAccount}
        unfollowAccount={unfollowAccount}
      />
    </InfiniteScroll>
  );
}
