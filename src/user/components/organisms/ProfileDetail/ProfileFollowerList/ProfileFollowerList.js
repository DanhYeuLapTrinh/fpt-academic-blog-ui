import React from "react";
import Text from "../../../atoms/Text/Text";
import { Stack } from "@mui/material";
import UserFollowProfile from "../../UserFollowProfile/UserFollowProfile";

export default function ProfileFollowerList(props) {
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize="23px">Người theo dõi</Text>
        <Text fontWeight="400" fontSize="14px">
          Lượt theo dõi:{" "}
          <span style={{ fontWeight: "600" }}>{props.followerList.length}</span>
        </Text>
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"warp"}
        width={"100%"}
        paddingTop={"20px"}
      >
        <Stack direction={"row"} flexWrap={"wrap"} gap={"20px"} width={"100%"}>
          {props?.followerList?.map((follower, index) => (
            <UserFollowProfile
              key={index}
              url={follower.profileUrl}
              fullName={follower.fullName}
              slug={`/profile/${follower.id}`}
              id={follower.id}
            />
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
