import { Box, Divider, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function CommentInteraction(props) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={"4px"}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton onClick={props.handleUpvoteComment} sx={{ p: "4px" }}>
          {props.select === "up" ? (
            <Icon
              icon="tabler:arrow-big-up-filled"
              style={{ color: "#5927e5", fontSize: "26px" }}
            />
          ) : (
            <Icon
              icon="tabler:arrow-big-up"
              style={{ color: "#c3c3c3", fontSize: "26px" }}
            />
          )}
        </IconButton>
        <Text fontSize="14px">{props.upvote}</Text>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        {/* <Text fontSize="14px">{props.downvote}</Text> */}
        <IconButton onClick={props.handleDownvoteComment} sx={{ p: "4px" }}>
          {props.select === "down" ? (
            <Icon
              icon="tabler:arrow-big-up-filled"
              style={{ color: "#5927e5", fontSize: "26px" }}
              vFlip={true}
            />
          ) : (
            <Icon
              icon="tabler:arrow-big-up"
              style={{ color: "#c3c3c3", fontSize: "26px" }}
              vFlip={true}
            />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
}
