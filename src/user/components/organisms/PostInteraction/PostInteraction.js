import { Divider, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function PostInteraction(props) {
  return (
    <div>
      <Divider orientation="horizontal" />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        m={"3px 0"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={props.handleUpvote}>
            {props.select === "up" ? (
              <Icon
                icon="tabler:arrow-big-up-filled"
                style={{ color: "#5927e5", fontSize: "28px" }}
              />
            ) : (
              <Icon
                icon="tabler:arrow-big-up"
                style={{ color: "#c3c3c3", fontSize: "28px" }}
              />
            )}
          </IconButton>
          <Text>{props.vote}</Text>
          <IconButton onClick={props.handleDownvote}>
            {props.select === "down" ? (
              <Icon
                icon="tabler:arrow-big-up-filled"
                style={{ color: "#5927e5", fontSize: "28px" }}
                vFlip={true}
              />
            ) : (
              <Icon
                icon="tabler:arrow-big-up"
                style={{ color: "#c3c3c3", fontSize: "28px" }}
                vFlip={true}
              />
            )}
          </IconButton>
        </Stack>
        <IconButton
          sx={{
            "&hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Icon icon="fa6-regular:comment" width={"24px"} color="#444746" />
          <Text ml="6px">Bình luận</Text>
        </IconButton>
      </Stack>
      <Divider orientation="horizontal" />
    </div>
  );
}
