import { Box, Stack } from "@mui/material";
import React from "react";
import QAVote from "../../molecules/QAVote/QAVote";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import AuthorQA from "../../molecules/AuthorQA/AuthorQA";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import { Link } from "react-router-dom";

export default function QA(props) {
  return (
    <Box
      sx={{
        width: props.full ? "100%" : "740px",
        height: "135px",
        borderRadius: "10px",
        bgcolor: "secondary.alt",
        display: "flex",
        p: " 8px 15px 0px 20px",
      }}
    >
      {!props.pending && (
        <Box display={"flex"} alignItems={"center"} pr={"10px"}>
          <QAVote />
        </Box>
      )}
      <Stack
        sx={{ width: "100%", height: "135px" }}
        justifyContent={"space-evenly"}
      >
        <Link to={props.slug} style={{ textDecoration: "none" }}>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="16px" lineHeight="20px">
              {props.title}
            </Text>
          </Wrapper>
        </Link>
        <Link to={props.slug} style={{ textDecoration: "none" }}>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="12px" fontWeight="400" lineHeight="16px">
              {props.description}
            </Text>
          </Wrapper>
        </Link>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={"12px"}>
            <PostTag
              fontSize="13px"
              color={props.tagColor ? props.tagColor : "primary.main"}
              text={props.major}
            />
            <PostTag
              fontSize="13px"
              color={props.tagColor ? props.tagColor : "primary.main"}
              text={props.subject}
            />
            <PostTag
              fontSize="13px"
              color={props.tagColor ? props.tagColor : "primary.main"}
              text={props.tag}
            />
          </Stack>
          <AuthorQA
            label={props.label}
            text="11"
            pending={props.pending}
            time={props.time}
            src={props.src}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
