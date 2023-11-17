import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PostCardV2 from "../../organisms/PostCardV2/PostCardV2";
import PostCardV1 from "../../organisms/PostCardV1/PostCardV1";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import PostCardV1Skeleton from "../../organisms/Skeleton/PostCardV1Skeleton/PostCardV1Skeleton";
import PostCardV2Skeleton from "../../organisms/Skeleton/PostCardV2Skeleton/PostCardV2Skeleton";

export default function TrendingList(props) {
  return (
      <Grid2 container xs={12} columnGap={"20px"} paddingTop={"37px"}>
        <Grid2 item xs={12}>
          <SectionTitle title="Thịnh hành" see link="/trending" />
        </Grid2>
        <Grid2 item xs>
          {!props.trendingPosts ? (
            <PostCardV1Skeleton desc />
          ) : (
            <PostCardV1
              url={props?.trendingPosts[1]?.coverURL}
              src={props?.trendingPosts[1]?.avatarURL}
              label={props?.trendingPosts[1]?.accountName}
              time={props?.trendingPosts[1]?.dateOfPost}
              postTitle={props?.trendingPosts[1]?.title}
              description={props?.trendingPosts[1]?.description}
              majorName={props?.trendingPosts[1]?.category[0]?.categoryName}
              majorID={props?.trendingPosts[1].category[0]?.categoryId}
              subjectName={
                props?.trendingPosts[1]?.category[2]?.categoryName
              }
              subjectID={props?.trendingPosts[1].category[2]?.categoryId}
              tagName={props?.trendingPosts[1]?.tag.tagName}
              tagID={props?.trendingPosts[1]?.tag.tagId}
              isRewarded={props?.trendingPosts[1]?.is_rewarded}
              small={true}
              slug={props?.trendingPosts[1]?.slug}
              userId={props?.trendingPosts[1]?.userId}
              boxHeight="492px"
              hasDescription={true}
              title="21px"
            />
          )}
        </Grid2>
        <Grid2 item xs={5}>
          {!props.trendingPosts ? (
            <PostCardV2Skeleton height={492} />
          ) : (
            <PostCardV2
              url={props?.trendingPosts[0]?.coverURL}
              src={props?.trendingPosts[0]?.avatarURL}
              label={props?.trendingPosts[0]?.accountName}
              time={props?.trendingPosts[0]?.dateOfPost}
              postTitle={props?.trendingPosts[0]?.title}
              description={props?.trendingPosts[0]?.description}
              majorName={props?.trendingPosts[0]?.category[0]?.categoryName}
              majorID={props?.trendingPosts[0].category[0]?.categoryId}
              subjectName={
                props?.trendingPosts[0]?.category[2]?.categoryName
              }
              subjectID={props?.trendingPosts[0].category[2]?.categoryId}
              tagName={props?.trendingPosts[0]?.tag.tagName}
              tagID={props?.trendingPosts[0]?.tag.tagId}
              isRewarded={props?.trendingPosts[0]?.is_rewarded}
              slug={props?.trendingPosts[0]?.slug}
              userId={props?.trendingPosts[0]?.userId}
              small={true}
              height="492px"
              clamp="4"
              title="30px"
            />
          )}
        </Grid2>
        <Grid2 item xs>
          <Grid2 container direction={"column"} rowGap={"20px"}>
            <Grid2 item xs style={{ height: "50%" }}>
              {!props.trendingPosts ? (
                <PostCardV1Skeleton />
              ) : (
                <PostCardV1
                  url={props?.trendingPosts[2]?.coverURL}
                  src={props?.trendingPosts[2]?.avatarURL}
                  label={props?.trendingPosts[2]?.accountName}
                  time={props?.trendingPosts[2]?.dateOfPost}
                  postTitle={props?.trendingPosts[2]?.title}
                  description={props?.trendingPosts[2]?.description}
                  majorName={
                    props?.trendingPosts[2]?.category[0]?.categoryName
                  }
                  majorID={props?.trendingPosts[2].category[0]?.categoryId}
                  subjectName={
                    props?.trendingPosts[2]?.category[2]?.categoryName
                  }
                  subjectID={
                    props?.trendingPosts[2].category[2]?.categoryId
                  }
                  isRewarded={props?.trendingPosts[2]?.is_rewarded}
                  tagName={props?.trendingPosts[2]?.tag.tagName}
                  tagID={props?.trendingPosts[2]?.tag.tagId}
                  slug={props?.trendingPosts[2]?.slug}
                  userId={props?.trendingPosts[2]?.userId}
                  h="130px"
                  boxHeight="236px"
                  title="16px"
                  small={true}
                />
              )}
            </Grid2>
            <Grid2 item xs style={{ height: "50%" }}>
              {!props.trendingPosts ? (
                <PostCardV1Skeleton />
              ) : (
                <PostCardV1
                  url={props?.trendingPosts[3]?.coverURL}
                  src={props?.trendingPosts[3]?.avatarURL}
                  label={props?.trendingPosts[3]?.accountName}
                  time={props?.trendingPosts[3]?.dateOfPost}
                  postTitle={props?.trendingPosts[3]?.title}
                  description={props?.trendingPosts[3]?.description}
                  majorName={
                    props?.trendingPosts[3]?.category[0]?.categoryName
                  }
                  majorID={props?.trendingPosts[3].category[0]?.categoryId}
                  subjectName={
                    props?.trendingPosts[3]?.category[2]?.categoryName
                  }
                  subjectID={
                    props?.trendingPosts[3].category[2]?.categoryId
                  }
                  isRewarded={props?.trendingPosts[3]?.is_rewarded}
                  tagName={props?.trendingPosts[3]?.tag.tagName}
                  tagID={props?.trendingPosts[3]?.tag.tagId}
                  slug={props?.trendingPosts[3]?.slug}
                  userId={props?.trendingPosts[3]?.userId}
                  h="130px"
                  boxHeight="236px"
                  title="16px"
                  small={true}
                />
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
  );
}
