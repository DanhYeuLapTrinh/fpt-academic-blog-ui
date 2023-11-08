import React from "react";
import PostCardShort from "../../organisms/PostCardShort/PostCardShort";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ShortList(props) {
  return (
    <div>
      <SectionTitle fontSize="20px" title="Lướt nhanh" see/>
      {props.shortPosts && (
        <Grid2 container xs={12} gap={"20px"}>
          <Grid2 container direction={"column"} xs rowGap={"20px"}>
            <Grid2 item xs>
              <PostCardShort
                url={props.shortPosts[0].coverURL}
                postTitle={props.shortPosts[0].title}
                majorName={props.shortPosts[0].category[0].categoryName}
                majorID={props.shortPosts[0].category[0].categoryId}
                subjectName={props.shortPosts[0].category[2].categoryName}
                subjectID={props.shortPosts[0].category[2].categoryId}
                tagName={props.shortPosts[0].tag.tagName}
                tagID={props.shortPosts[0].tag.tagId}
                slug={props.shortPosts[0].slug}
                height="280px"
                fontSize="12px"
              />
            </Grid2>
            <Grid2 item xs>
              <PostCardShort
                url={props.shortPosts[1].coverURL}
                postTitle={props.shortPosts[1].title}
                majorName={props.shortPosts[1].category[0].categoryName}
                majorID={props.shortPosts[1].category[0].categoryId}
                subjectName={props.shortPosts[1].category[2].categoryName}
                subjectID={props.shortPosts[1].category[2].categoryId}
                tagName={props.shortPosts[1].tag.tagName}
                tagID={props.shortPosts[1].tag.tagId}
                slug={props.shortPosts[1].slug}
                height="140px"
                fontSize="12px"
              />
            </Grid2>
          </Grid2>
          <Grid2 container direction={"column"} xs rowGap={"20px"}>
            <Grid2 item xs>
              <PostCardShort
                url={props.shortPosts[2].coverURL}
                postTitle={props.shortPosts[2].title}
                majorName={props.shortPosts[2].category[0].categoryName}
                majorID={props.shortPosts[2].category[0].categoryId}
                subjectName={props.shortPosts[2].category[2].categoryName}
                subjectID={props.shortPosts[2].category[2].categoryId}
                tagName={props.shortPosts[2].tag.tagName}
                tagID={props.shortPosts[2].tag.tagId}
                slug={props.shortPosts[2].slug}
                height="140px"
                fontSize="12px"
              />
            </Grid2>
            <Grid2 item xs>
              <PostCardShort
                url={props.shortPosts[3].coverURL}
                postTitle={props.shortPosts[3].title}
                majorName={props.shortPosts[3].category[0].categoryName}
                majorID={props.shortPosts[3].category[0].categoryId}
                subjectName={props.shortPosts[3].category[2].categoryName}
                subjectID={props.shortPosts[3].category[2].categoryId}
                tagName={props.shortPosts[3].tag.tagName}
                tagID={props.shortPosts[3].tag.tagId}
                slug={props.shortPosts[3].slug}
                height="280px"
                fontSize="12px"
              />
            </Grid2>
          </Grid2>
          <Grid2 container xs={12}>
            <Grid2 item xs>
              <PostCardShort
                url={props.shortPosts[4].coverURL}
                postTitle={props.shortPosts[4].title}
                majorName={props.shortPosts[4].category[0].categoryName}
                majorID={props.shortPosts[4].category[0].categoryId}
                subjectName={props.shortPosts[4].category[2].categoryName}
                subjectID={props.shortPosts[4].category[2].categoryId}
                tagName={props.shortPosts[4].tag.tagName}
                tagID={props.shortPosts[4].tag.tagId}
                slug={props.shortPosts[4].slug}
                height="160px"
                fontSize="12px"
              />
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </div>
  );
}
