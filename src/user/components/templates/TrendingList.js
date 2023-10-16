import React from "react";
import PostCardV1 from "../organisms/PostCardV1/PostCardV1";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PostCardV2 from "../organisms/PostCardV2/PostCardV2";
import Text from "../atoms/Text/Text";

export default function TrendingList() {
  return (
    <Grid2 container xs={12} columnGap={"20px"} rowGap={"20px"} paddingTop={'37px'}>
      <Grid2 item xs={12}>
        <Text fontSize="26px">Thịnh Hành</Text>
      </Grid2>
      <Grid2 item xs>
        <PostCardV1 boxHeight="492px" hasDescription={true} title="21px"/>
      </Grid2>
      <Grid2 item xs={5}>
        <PostCardV2 title="30px"/>
      </Grid2>
      <Grid2 item xs>
        <Grid2 container direction={"column"} rowGap={'20px'}>
          <Grid2 item xs style={{ height: "50%" }}>
            <PostCardV1 boxHeight="236px" title="16px" small={true}/>
          </Grid2>
          <Grid2 item xs  style={{ height: "50%" }}>
            <PostCardV1 boxHeight="236px" title="16px" small={true}/>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
