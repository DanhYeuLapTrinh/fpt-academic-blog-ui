import { IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function CommentInteraction(props) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton onClick={props.handleUpvoteComment}>
          {props.select === "up" ? (
            <Icon
              icon="tabler:arrow-big-up-filled"
              style={{ color: "#5927e5", fontSize: "22px" }}
            />
          ) : (
            <Icon
              icon="tabler:arrow-big-up"
              style={{ color: "#c3c3c3", fontSize: "22px" }}
            />
          )}
        </IconButton>
        <Text>{props.vote}</Text>
        <IconButton onClick={props.handleDownvoteComment}>
          {props.select === "down" ? (
            <Icon
              icon="tabler:arrow-big-up-filled"
              style={{ color: "#5927e5", fontSize: "22px" }}
              vFlip={true}
            />
          ) : (
            <Icon
              icon="tabler:arrow-big-up"
              style={{ color: "#c3c3c3", fontSize: "22px" }}
              vFlip={true}
            />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
}
