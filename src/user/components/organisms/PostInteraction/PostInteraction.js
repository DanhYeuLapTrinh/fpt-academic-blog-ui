import { Divider, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function PostInteraction({ handleActions, ...props }) {
  return (
    <div>
      <Divider orientation="horizontal" />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        m={"8px 0"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ bgcolor: "secondary.alt", borderRadius: "20px" }}
          justifyContent={"space-between"}
          width={"140px"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={() => handleActions("upvote")}
            >
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
            <Text>{props.upvote}</Text>
          </Stack>
          <Divider
            orientation="vertical"
            sx={{
              height: "30px",
              borderRight: "1px solid #c3c3c3",
              alignSelf: "center",
            }}
            flexItem
          />
          <Stack direction={"row"} alignItems={"center"}>
            <Text>{props.downvote}</Text>
            <IconButton
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={() => handleActions("downvote")}
            >
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
        </Stack>
        <IconButton
          sx={{
            "&hover": {
              backgroundColor: "transparent",
            },
          }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          <Icon icon="fa6-regular:comment" width={"24px"} color="#444746" />
          <Text ml="6px">Bình luận</Text>
        </IconButton>
      </Stack>
      <Divider orientation="horizontal" />
    </div>
  );
}
