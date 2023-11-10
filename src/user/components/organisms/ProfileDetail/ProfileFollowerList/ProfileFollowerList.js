import React from "react";
import Text from "../../../atoms/Text/Text";
import { Stack } from "@mui/material";

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
    </div>
  );
}
