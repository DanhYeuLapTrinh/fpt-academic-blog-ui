import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function NormalPostSkeleton() {
  return (
    <Stack padding={"20px 0"} direction={"row"}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={265}
        height={240}
        sx={{ borderRadius: "10px" }}
      />
      <Stack
        justifyContent={"space-evenly"}
        width={"calc(100% - 265px)"}
        sx={{ padding: "0 20px" }}
      >
        <Skeleton
          width="100%"
          height={44}
          sx={{ borderRadius: "10px" }}
          variant="h1"
          animation="wave"
        />
        <Skeleton
          width="100%"
          height={60}
          sx={{ borderRadius: "10px" }}
          variant="h1"
          animation="wave"
        />
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Skeleton
            width={28}
            height={28}
            variant="circular"
            animation="wave"
          />
          <Skeleton width="24%" height={28} animation="wave" />
        </Stack>
        <Skeleton width="15%" height={23} animation="wave" />
      </Stack>
    </Stack>
  );
}
