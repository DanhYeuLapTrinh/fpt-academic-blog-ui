import { Box, Container, IconButton } from "@mui/material";
import React from "react";
import PostCardV1 from "../PostCardV1/PostCardV1";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LatestPostSkeleton from "../Skeleton/LatestPostSkeleton/LatestPostSkeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./stylecaro.scss";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1150 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function LatestPostSection(props) {
  return (
    <>
      <Container>
        <SectionTitle title="Mới đăng gần đây" see link="/latest" />
      </Container>
      <Box
        sx={{
          marginBottom: "59px",
          width: "100%",
          height: "340px",
          bgcolor: "primary.main",
          display: "flex",
        }}
      >
        <Container>
          <Carousel
            responsive={responsive}
            arrows
            autoPlaySpeed={1000 * 10}
            className="hello"
            sliderClass=""
            slidesToSlide={4}
            swipeable
          >
            {!props.latestPosts
              ? Array(4)
                  .fill(null)
                  .map((_, i) => <LatestPostSkeleton key={i} />)
              : props.latestPosts.map((item) => (
                  <PostCardV1
                    key={item?.postId}
                    url={item?.coverURL}
                    src={item?.avatarURL}
                    label={item?.accountName}
                    time={item?.dateOfPost}
                    postTitle={item?.title}
                    majorName={item?.category[0]?.categoryName}
                    majorID={item?.category[0]?.categoryId}
                    subjectName={item?.category[2]?.categoryName}
                    subjectID={item?.category[2]?.categoryId}
                    tagName={item?.tag.tagName}
                    tagID={item?.tag.tagId}
                    slug={item?.slug}
                    userId={item?.userId}
                    isRewarded={item?.is_rewarded}
                    small={true}
                    color="secondary.main"
                    authorColor="secondary.main"
                    tagColor="secondary.main"
                    h="155px"
                    boxHeight="275px"
                    boxWidth="265px"
                  />
                ))}
          </Carousel>
        </Container>
      </Box>
    </>
  );
}
