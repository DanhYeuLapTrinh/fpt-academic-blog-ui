import React from 'react'
import { Box, Container, Stack } from "@mui/material";
import SectionTitle from "../../../molecules/SectionTitle/SectionTitle";
import PostCardV1 from "../../../organisms/PostCardV1/PostCardV1";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Post from "../../../organisms/Post/Post";
import Text from "../../../atoms/Text/Text";
import { Link } from "react-router-dom";

export default function ShortPostSeeMore(props) {
  return (
    <Box mb={"20px"}>
      <Box
        sx={{
          pt: "37px",
          minHeight: "calc(100vh - 93px)",
          bgcolor: "secondary.alt",
        }}
      >
        <Container sx={{ minHeight: "calc(100vh - 93px)" }}>
          <SectionTitle title="Trang xem nhanh" />
          {props.data && (
            <Box width={"100%"}>
              <Stack direction={"row"} width={"100%"} spacing={"20px"} mb={2}>
                <Box flex={1}>
                  <PostCardV1
                    h="357px"
                    boxHeight="428px"
                    url={props.data[0]?.coverURL}
                    src={props.data[0]?.avatarURL}
                    label={props.data[0]?.accountName}
                    time={props.data[0]?.dateOfPost}
                    postTitle={props.data[0]?.title}
                    description={props.data[0]?.description}
                    isRewarded={props.data[0]?.is_rewarded}
                    slug={props.data[0]?.slug}
                    userId={props.data[0]?.userId}
                    small
                    clamp="4"
                    title="20px"
                    noAuthor
                  />
                  <Link
                    to={`/profile/${props.data[0]?.userId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Text fontSize={"14px"}>{props.data[0].accountName}</Text>
                  </Link>
                </Box>
                <Box flex={1}>
                  <PostCardV1
                    h="357px"
                    boxHeight="428px"
                    url={props.data[1]?.coverURL}
                    src={props.data[1]?.avatarURL}
                    label={props.data[1]?.accountName}
                    time={props.data[1]?.dateOfPost}
                    postTitle={props.data[1]?.title}
                    description={props.data[1]?.description}
                    isRewarded={props.data[1]?.is_rewarded}
                    slug={props.data[1]?.slug}
                    userId={props.data[1]?.userId}
                    small
                    clamp="4"
                    title="20px"
                    noAuthor
                  />
                  <Link
                    to={`/profile/${props.data[1]?.userId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Text fontSize={"14px"}>{props.data[1].accountName}</Text>
                  </Link>
                </Box>
              </Stack>
              <Grid2 container xs={12}>
                <Grid2
                  container
                  direction={"row"}
                  xs={12}
                  sx={{
                    "& > div": {
                      padding: "0 10px",
                      "&:first-of-type": {
                        paddingLeft: 0,
                      },
                      "&:last-of-type": {
                        paddingRight: 0,
                      },
                    },
                    mt: "20px",
                  }}
                >
                  <Grid2 item xs={4}>
                    <PostCardV1
                      h="200px"
                      boxHeight="280px"
                      url={props.data[2]?.coverURL}
                      src={props.data[2]?.avatarURL}
                      label={props.data[2]?.accountName}
                      time={props.data[2]?.dateOfPost}
                      postTitle={props.data[2]?.title}
                      description={props.data[2]?.description}
                      isRewarded={props.data[2]?.is_rewarded}
                      slug={props.data[2]?.slug}
                      userId={props.data[2]?.userId}
                      small={true}
                      clamp="4"
                      title="20px"
                      noAuthor
                    />
                    <Link
                      to={`/profile/${props.data[2]?.userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Text fontSize={"14px"}>{props.data[2].accountName}</Text>
                    </Link>
                  </Grid2>
                  <Grid2 item xs={4}>
                    <PostCardV1
                      h="200px"
                      boxHeight="280px"
                      url={props.data[3]?.coverURL}
                      src={props.data[3]?.avatarURL}
                      label={props.data[3]?.accountName}
                      time={props.data[3]?.dateOfPost}
                      postTitle={props.data[3]?.title}
                      description={props.data[3]?.description}
                      isRewarded={props.data[3]?.is_rewarded}
                      slug={props.data[3]?.slug}
                      userId={props.data[3]?.userId}
                      small={true}
                      clamp="4"
                      title="20px"
                      noAuthor
                    />
                    <Link
                      to={`/profile/${props.data[3]?.userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Text fontSize={"14px"}>{props.data[3].accountName}</Text>
                    </Link>
                  </Grid2>
                  <Grid2 item xs={4}>
                    <PostCardV1
                      h="200px"
                      boxHeight="280px"
                      url={props.data[4]?.coverURL}
                      src={props.data[4]?.avatarURL}
                      label={props.data[4]?.accountName}
                      time={props.data[4]?.dateOfPost}
                      postTitle={props.data[4]?.title}
                      description={props.data[4]?.description}
                      isRewarded={props.data[4]?.is_rewarded}
                      slug={props.data[4]?.slug}
                      userId={props.data[4]?.userId}
                      small={true}
                      clamp="4"
                      title="20px"
                      noAuthor
                    />
                    <Link
                      to={`/profile/${props.data[4]?.userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Text fontSize={"14px"}>{props.data[4].accountName}</Text>
                    </Link>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Box>
          )}
        </Container>
      </Box>
      <Container>
        <Grid2 container>
          <Grid2 item xs={8} direction={"column"}>
            {props?.data?.slice(5)?.map((item, index) => (
              <Post
                key={index}
                url={item?.coverURL}
                title={item?.title}
                description={item?.description}
                author={item?.accountName}
                src={item?.avatarURL}
                time={item?.dateOfPost}
                majorName={item?.category[0]?.categoryName}
                majorID={item?.category[0]?.categoryId}
                subjectName={item?.category[2]?.categoryName}
                subjectID={item?.category[2]?.categoryId}
                tagName={item?.tag.tagName}
                tagID={item?.tag.tagId}
                isRewarded={item?.is_rewarded}
                small
                slug={item?.slug}
                tagColor="primary.main"
              />
            ))}
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}
