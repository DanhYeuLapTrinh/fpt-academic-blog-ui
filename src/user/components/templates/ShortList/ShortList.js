import React from "react";
import PostCardShort from "../../organisms/PostCardShort/PostCardShort";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ShortList() {
  return (
    <div>
      <SectionTitle fontSize="20px" title="Lướt nhanh" />
      <Grid2 container xs={12} gap={"20px"}>
        <Grid2 container direction={"column"} xs rowGap={"20px"}>
          <Grid2 item xs>
            <PostCardShort height="280px" fontSize="12px" />
          </Grid2>
          <Grid2 item xs>
            <PostCardShort height="140px" fontSize="12px" />
          </Grid2>
        </Grid2>
        <Grid2 container direction={"column"} xs rowGap={"20px"}>
          <Grid2 item xs>
            <PostCardShort height="140px" fontSize="12px" />
          </Grid2>
          <Grid2 item xs>
            <PostCardShort height="280px" fontSize="12px" />
          </Grid2>
        </Grid2>
        <Grid2 container xs={12}>
          <Grid2 item xs>
            <PostCardShort height="160px" fontSize="12px" />
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
}
