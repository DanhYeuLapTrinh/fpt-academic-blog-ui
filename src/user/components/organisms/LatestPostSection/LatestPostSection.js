import { Box, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import PostCardV1 from "../PostCardV1/PostCardV1";
import SeeAllButton from "../../atoms/SeeAllButton/SeeAllButton";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
export default function LatestPostSection() {
  return (
    <Box sx={{ marginBottom: "59px" }}>
      <Container
        sx={{
          paddingBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text fontSize="26px">Mới đăng gần đây</Text>
        <SeeAllButton />
      </Container>
      <Box
        sx={{
          width: "100%",
          height: "340px",
          bgcolor: "primary.main",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "250px",
            top: "50%",
            transform: "translate(50%, -50%)",
          }}
        >
          <ArrowBackIosRoundedIcon
            sx={{ fontSize: "40px", color: "secondary.main" }}
          />
        </IconButton>
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PostCardV1
            authorColor="secondary.main"
            color="secondary.main"
            tagColor="secondary.main"
            small={true}
            h="155px"
            boxHeight="275px"
            boxWidth="265px"
          />
          <PostCardV1
            authorColor="secondary.main"
            color="secondary.main"
            tagColor="secondary.main"
            small={true}
            h="155px"
            boxHeight="275px"
            boxWidth="265px"
          />
          <PostCardV1
            authorColor="secondary.main"
            color="secondary.main"
            tagColor="secondary.main"
            small={true}
            h="155px"
            boxHeight="275px"
            boxWidth="265px"
          />
          <PostCardV1
            authorColor="secondary.main"
            color="secondary.main"
            tagColor="secondary.main"
            small={true}
            h="155px"
            boxHeight="275px"
            boxWidth="265px"
          />
        </Container>
        <IconButton
          sx={{
            position: "absolute",
            right: "250px",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ArrowForwardIosRoundedIcon
            sx={{ fontSize: "40px", color: "secondary.main" }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
