import { Box, Container, IconButton } from "@mui/material";
import React from "react";
import PostCardV1 from "../PostCardV1/PostCardV1";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";

export default function LatestPostSection(props) {
  return (
    <Box sx={{ marginBottom: "59px" }}>
      <Container>
        <SectionTitle title="Mới đăng gần đây" />
      </Container>
      <Box
        sx={{
          width: "100%",
          height: "340px",
          bgcolor: "primary.main",
          display: "flex",
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translate(-50%, -50%)",
              left: "-5%",
            }}
          >
            <ArrowBackIosRoundedIcon
              sx={{ fontSize: "40px", color: "secondary.main" }}
            />
          </IconButton>
          {props?.latestPosts?.map((item) => (
            <PostCardV1
              url={item?.coverURL}
              src={item?.avatarURL}
              label={item?.accountName}
              time={item?.dateOfPost}
              postTitle={item?.title}
              color="secondary.main"
              authorColor="secondary.main"
              tagColor="secondary.main"
              major={item?.category[0]}
              subject={item?.category[1]}
              tag={item?.tag}
              slug={item?.slug}
              userId={item?.userId}
              small={true}
              h="155px"
              boxHeight="275px"
              boxWidth="265px"
            />
          ))}
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translate(50%, -50%)",
              right: "-5%",
            }}
          >
            <ArrowForwardIosRoundedIcon
              sx={{ fontSize: "40px", color: "secondary.main" }}
            />
          </IconButton>
        </Container>
      </Box>
    </Box>
  );
}
