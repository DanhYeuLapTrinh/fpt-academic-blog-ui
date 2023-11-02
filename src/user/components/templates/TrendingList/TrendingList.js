import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PostCardV2 from "../../organisms/PostCardV2/PostCardV2";
import PostCardV1 from "../../organisms/PostCardV1/PostCardV1";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import { getFirstChar } from "../../../utils/StringMethod";

export default function TrendingList(props) {
  return (
    <>
      {props.trendingPosts && (
        <Grid2 container xs={12} columnGap={"20px"} paddingTop={"37px"}>
          <Grid2 item xs={12}>
            <SectionTitle title="Thịnh hành" />
          </Grid2>
          <Grid2 item xs>
            <PostCardV1
              url={props?.trendingPosts[1]?.coverURL}
              src={props?.trendingPosts[1]?.avatarURL}
              label={props?.trendingPosts[1]?.accountName}
              time={props?.trendingPosts[1]?.dateOfPost}
              postTitle={props?.trendingPosts[1]?.title}
              description={props?.trendingPosts[1]?.description}
              major={getFirstChar(props?.trendingPosts[1]?.category[0])}
              subject={props?.trendingPosts[1]?.category[1]}
              tag={props?.trendingPosts[1]?.tag}
              boxHeight="492px"
              hasDescription={true}
              title="21px"
            />
          </Grid2>
          <Grid2 item xs={5}>
            <PostCardV2
              url={props?.trendingPosts[0]?.coverURL}
              src={props?.trendingPosts[0]?.avatarURL}
              label={props?.trendingPosts[0]?.accountName}
              time={props?.trendingPosts[0]?.dateOfPost}
              postTitle={props?.trendingPosts[0]?.title}
              description={props?.trendingPosts[0]?.description}
              major={getFirstChar(props?.trendingPosts[0]?.category[0])}
              subject={props?.trendingPosts[0]?.category[1]}
              tag={props?.trendingPosts[0]?.tag}
              height="492px"
              clamp="4"
              title="30px"
            />
          </Grid2>
          <Grid2 item xs>
            <Grid2 container direction={"column"} rowGap={"20px"}>
              <Grid2 item xs style={{ height: "50%" }}>
                <PostCardV1
                  url={props?.trendingPosts[2]?.coverURL}
                  src={props?.trendingPosts[2]?.avatarURL}
                  label={props?.trendingPosts[2]?.accountName}
                  time={props?.trendingPosts[2]?.dateOfPost}
                  postTitle={props?.trendingPosts[2]?.title}
                  description={props?.trendingPosts[2]?.description}
                  major={getFirstChar(props?.trendingPosts[2]?.category[0])}
                  subject={props?.trendingPosts[2]?.category[1]}
                  tag={props?.trendingPosts[2]?.tag}
                  h="130px"
                  boxHeight="236px"
                  title="16px"
                  small={true}
                />
              </Grid2>
              <Grid2 item xs style={{ height: "50%" }}>
                <PostCardV1
                  url={props?.trendingPosts[3]?.coverURL}
                  src={props?.trendingPosts[3]?.avatarURL}
                  label={props?.trendingPosts[3]?.accountName}
                  time={props?.trendingPosts[3]?.dateOfPost}
                  postTitle={props?.trendingPosts[3]?.title}
                  description={props?.trendingPosts[3]?.description}
                  major={getFirstChar(props?.trendingPosts[3]?.category[0])}
                  subject={props?.trendingPosts[3]?.category[1]}
                  tag={props?.trendingPosts[3]?.tag}
                  h="130px"
                  boxHeight="236px"
                  title="16px"
                  small={true}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </>
  );
}
