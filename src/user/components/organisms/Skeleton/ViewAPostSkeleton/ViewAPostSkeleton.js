import { Container, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function ViewAPostSkeleton() {
  return (
    <Container sx={{ minHeight: "calc(100vh - 93px)", mt: 3 }}>
      <Stack spacing={2}>
        <Skeleton
          variant="rectangular"
          width="25%"
          height="20px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height="80px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Skeleton
            variant="circular"
            width="40px"
            height="40px"
            animation="wave"
          />
          <Skeleton
            variant="h1"
            width="25%"
            animation="wave"
            height={"44px"}
            sx={{ borderRadius: "5px" }}
          />
        </Stack>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="320px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="h1"
          width="100%"
          height="20px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="h1"
          width="100%"
          height="20px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="h1"
          width="100%"
          height="20px"
          animation="wave"
          sx={{ borderRadius: "5px" }}
        />
      </Stack>
    </Container>
  );
}
