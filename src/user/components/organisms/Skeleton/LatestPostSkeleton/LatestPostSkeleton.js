import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function LatestPostSkeleton() {
  return (
    <Stack sx={{ zIndex: 1 }} justifyContent={'space-between'} height={"275px"}>
      <Skeleton
        variant="rectangular"
        width="265px"
        height="155px"
        animation="wave"
        sx={{ borderRadius: "10px" }}
      />
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Skeleton
          variant="circular"
          width="28px"
          height="28px"
          animation="wave"
        />
        <Skeleton variant="h1" width="70%" animation="wave" height={"18px"} sx={{borderRadius: "5px"}}/>
      </Stack>
      <Skeleton variant="h1" width="100%" animation="wave" height={"40px"} sx={{borderRadius: "5px"}}/>
      <Skeleton variant="h1" width="60%" animation="wave" height={"20px"} sx={{borderRadius: "5px"}}/>
    </Stack>
  );
}
