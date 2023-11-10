import { Stack } from "@mui/material";
import React from "react";
import Text from "../../../atoms/Text/Text";
import UserFollowProfile from "../../UserFollowProfile/UserFollowProfile";

export default function ProfileFollowingList(props) {
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize="23px">Đang theo dõi</Text>
        <Text fontWeight="400" fontSize="14px">
          Lượt theo dõi:{" "}
          <span style={{ fontWeight: "600" }}>
            {props.followingList.length}
          </span>
        </Text>
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"warp"}
        width={"100%"}
        paddingTop={"20px"}
      >
        <Stack direction={"row"} flexWrap={"wrap"} gap={"20px"} width={"100%"}>
          {props?.followingList?.map((following, index) => (
            <UserFollowProfile
              key={index}
              url={following.profileUrl}
              fullName={following.fullName}
              id={following.id}
              slug={`/profile/${following.id}`}
              followingPage
            />
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
