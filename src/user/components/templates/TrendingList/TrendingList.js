import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PostCardV2 from "../../organisms/PostCardV2/PostCardV2";
import PostCardV1 from "../../organisms/PostCardV1/PostCardV1";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";

export default function TrendingList() {
  return (
    <Grid2 container xs={12} columnGap={"20px"} paddingTop={"37px"}>
      <Grid2 item xs={12}>
        <SectionTitle title="Thịnh hành" />
      </Grid2>
      <Grid2 item xs>
        <PostCardV1 boxHeight="492px" hasDescription={true} title="21px" />
      </Grid2>
      <Grid2 item xs={5}>
        <PostCardV2 height="492px" clamp="4" title="30px" />
      </Grid2>
      <Grid2 item xs>
        <Grid2 container direction={"column"} rowGap={"20px"}>
          <Grid2 item xs style={{ height: "50%" }}>
            <PostCardV1 h="130px" boxHeight="236px" title="16px" small={true} />
          </Grid2>
          <Grid2 item xs style={{ height: "50%" }}>
            <PostCardV1 h="130px" boxHeight="236px" title="16px" small={true} />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
