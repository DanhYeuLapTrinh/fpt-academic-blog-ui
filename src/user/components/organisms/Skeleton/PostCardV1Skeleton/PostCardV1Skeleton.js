import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function PostCardV1Skeleton(props) {
  return (
    <Stack spacing={"6px"}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={props.desc ? 268 : 130}
        sx={{ borderRadius: "10px" }}
      />
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Skeleton width={28} height={28} variant="circular" animation="wave" />
        <Skeleton width="60%" height={28} animation="wave" />
      </Stack>
      <Skeleton
        width="100%"
        height={44}
        sx={{ borderRadius: "10px" }}
        variant="h1"
        animation="wave"
      />
      {props.desc && (
        <Skeleton
          width="100%"
          height={78}
          sx={{ borderRadius: "10px" }}
          variant="h1"
          animation="wave"
        />
      )}
      <Skeleton width="45%" height={18} animation="wave" />
    </Stack>
  );
}
