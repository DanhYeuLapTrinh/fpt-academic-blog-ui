import { Divider, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";

export default function PostInteraction() {
  const [select, setSelect] = useState("up");
  const [vote, setVote] = useState(10);
  const handleUpvote = () => {
    if (select !== "up") {
      setSelect("up");
      setVote((prev) => prev + 1);
    }
  };
  const handleDownvote = () => {
    if (select !== "down") {
      setSelect("down");
      setVote((prev) => prev - 1);
    }
  };
  return (
    <div>
      <Divider orientation="horizontal" />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        m={"5px 0"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton onClick={() => handleUpvote()}>
            {select === "up" ? (
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
          <Text>{vote}</Text>
          <IconButton onClick={() => handleDownvote()}>
            {select === "down" ? (
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
        <IconButton
          sx={{
            "&hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Icon icon="ph:share-fat" width={"24px"} color="#444746" />
          <Text ml="6px">Chia sẻ</Text>
        </IconButton>
      </Stack>
      <Divider orientation="horizontal" />
    </div>
  );
}
