import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function PostCardV2Skeleton(props) {
  return (
    <Stack>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={props.height}
        sx={{ borderRadius: "10px" }}
      />
    </Stack>
  );
}
