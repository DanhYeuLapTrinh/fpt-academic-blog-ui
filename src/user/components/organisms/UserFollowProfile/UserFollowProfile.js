import { Box, Button, Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import { Link, useParams } from "react-router-dom";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useProfile from "../../../hooks/useProfile";
import useAuth from "../../../hooks/useAuth";

export default function UserFollowProfile(props) {
  const axiosPrivate = useAxiosPrivate();
  const { followingList, setFollowingList } = useProfile();
  const auth = useAuth();
  const { id } = useParams();
  const unfollow = async (inputId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_UNFOLLOW_ACCOUNT,
        {
          followedBy: id,
          userId: inputId,
        }
      );
      if (response) {
        let newFollowerList = followingList.filter(
          (follower) => follower.id !== inputId
        );
        setFollowingList(newFollowerList);
      }
    } catch (error) {}
  };
  return (
    <Box sx={{ width: "calc((100% - 20px)/2)" }}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Link to={props.slug} style={{ textDecoration: "none" }}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                backgroundImage: `url(${props.url ?? "/assets/img/blank.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
              }}
            />
            <Wrapper WebkitLineClamp="1" width="170px">
              <Text fontSize="15px">{props.fullName}</Text>
            </Wrapper>
          </Stack>
        </Link>
        {props.followingPage && Number(id) === auth.id && (
          <Button
            size="small"
            sx={{ justifySelf: "flex-end", textTransform: "none" }}
            variant="contained"
            onClick={() => unfollow(props.id)}
          >
            <Text fontSize="12px" color="secondary.main">
              Hủy theo dõi
            </Text>
          </Button>
        )}
      </Stack>
    </Box>
  );
}
