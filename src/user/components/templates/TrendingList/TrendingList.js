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
        {!props.trendingPostsHome ? (
          <PostCardV1Skeleton desc />
        ) : (
          <PostCardV1
            url={props?.trendingPostsHome[1]?.coverURL}
            src={props?.trendingPostsHome[1]?.avatarURL}
            label={props?.trendingPostsHome[1]?.accountName}
            time={props?.trendingPostsHome[1]?.dateOfPost}
            postTitle={props?.trendingPostsHome[1]?.title}
            description={props?.trendingPostsHome[1]?.description}
            majorName={props?.trendingPostsHome[1]?.category[0]?.categoryName}
            majorID={props?.trendingPostsHome[1].category[0]?.categoryId}
            subjectName={props?.trendingPostsHome[1]?.category[2]?.categoryName}
            subjectID={props?.trendingPostsHome[1].category[2]?.categoryId}
            tagName={props?.trendingPostsHome[1]?.tag.tagName}
            tagID={props?.trendingPostsHome[1]?.tag.tagId}
            isRewarded={props?.trendingPostsHome[1]?.is_rewarded}
            small={true}
            slug={props?.trendingPostsHome[1]?.slug}
            userId={props?.trendingPostsHome[1]?.userId}
            boxHeight="492px"
            hasDescription={true}
            title="21px"
          />
        )}
      </Grid2>
      <Grid2 item xs={5}>
        {!props.trendingPostsHome ? (
          <PostCardV2Skeleton height={492} />
        ) : (
          <PostCardV2
            url={props?.trendingPostsHome[0]?.coverURL}
            src={props?.trendingPostsHome[0]?.avatarURL}
            label={props?.trendingPostsHome[0]?.accountName}
            time={props?.trendingPostsHome[0]?.dateOfPost}
            postTitle={props?.trendingPostsHome[0]?.title}
            description={props?.trendingPostsHome[0]?.description}
            majorName={props?.trendingPostsHome[0]?.category[0]?.categoryName}
            majorID={props?.trendingPostsHome[0].category[0]?.categoryId}
            subjectName={props?.trendingPostsHome[0]?.category[2]?.categoryName}
            subjectID={props?.trendingPostsHome[0].category[2]?.categoryId}
            tagName={props?.trendingPostsHome[0]?.tag.tagName}
            tagID={props?.trendingPostsHome[0]?.tag.tagId}
            isRewarded={props?.trendingPostsHome[0]?.is_rewarded}
            slug={props?.trendingPostsHome[0]?.slug}
            userId={props?.trendingPostsHome[0]?.userId}
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
            {!props.trendingPostsHome ? (
              <PostCardV1Skeleton />
            ) : (
              <PostCardV1
                url={props?.trendingPostsHome[2]?.coverURL}
                src={props?.trendingPostsHome[2]?.avatarURL}
                label={props?.trendingPostsHome[2]?.accountName}
                time={props?.trendingPostsHome[2]?.dateOfPost}
                postTitle={props?.trendingPostsHome[2]?.title}
                description={props?.trendingPostsHome[2]?.description}
                majorName={
                  props?.trendingPostsHome[2]?.category[0]?.categoryName
                }
                majorID={props?.trendingPostsHome[2].category[0]?.categoryId}
                subjectName={
                  props?.trendingPostsHome[2]?.category[2]?.categoryName
                }
                subjectID={props?.trendingPostsHome[2].category[2]?.categoryId}
                isRewarded={props?.trendingPostsHome[2]?.is_rewarded}
                tagName={props?.trendingPostsHome[2]?.tag.tagName}
                tagID={props?.trendingPostsHome[2]?.tag.tagId}
                slug={props?.trendingPostsHome[2]?.slug}
                userId={props?.trendingPostsHome[2]?.userId}
                h="130px"
                boxHeight="236px"
                title="16px"
                small={true}
              />
            )}
          </Grid2>
          <Grid2 item xs style={{ height: "50%" }}>
            {!props.trendingPostsHome ? (
              <PostCardV1Skeleton />
            ) : (
              <PostCardV1
                url={props?.trendingPostsHome[3]?.coverURL}
                src={props?.trendingPostsHome[3]?.avatarURL}
                label={props?.trendingPostsHome[3]?.accountName}
                time={props?.trendingPostsHome[3]?.dateOfPost}
                postTitle={props?.trendingPostsHome[3]?.title}
                description={props?.trendingPostsHome[3]?.description}
                majorName={
                  props?.trendingPostsHome[3]?.category[0]?.categoryName
                }
                majorID={props?.trendingPostsHome[3].category[0]?.categoryId}
                subjectName={
                  props?.trendingPostsHome[3]?.category[2]?.categoryName
                }
                subjectID={props?.trendingPostsHome[3].category[2]?.categoryId}
                isRewarded={props?.trendingPostsHome[3]?.is_rewarded}
                tagName={props?.trendingPostsHome[3]?.tag.tagName}
                tagID={props?.trendingPostsHome[3]?.tag.tagId}
                slug={props?.trendingPostsHome[3]?.slug}
                userId={props?.trendingPostsHome[3]?.userId}
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
