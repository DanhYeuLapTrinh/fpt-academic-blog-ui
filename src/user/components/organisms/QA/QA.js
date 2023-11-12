import { Box, Stack } from "@mui/material";
import React from "react";
import QAVote from "../../molecules/QAVote/QAVote";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import AuthorQA from "../../molecules/AuthorQA/AuthorQA";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { getFirstChar, toSlug } from "../../../utils/StringMethod";

export default function QA(props) {
  return (
    <Link to={props.slug} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          width: props.full ? "100%" : "740px",
          height: "135px",
          borderRadius: "10px",
          bgcolor: props.bg ? props.bg : "secondary.alt",
          display: "flex",
          p: " 8px 15px 0px 20px",
        }}
      >
        {!props.pending && (
          <Box display={"flex"} alignItems={"center"} pr={"10px"}>
            <QAVote vote={props.vote}/>
          </Box>
        )}
        <Stack
          sx={{ width: "100%", height: "135px" }}
          justifyContent={"space-evenly"}
        >
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="16px" lineHeight="20px">
              {props.title}
            </Text>
          </Wrapper>

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
              <Link
                to={{
                  pathname: "/categories",
                  search: `?name=${toSlug(props.majorName, true)}&id=${
                    props.majorID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={getFirstChar(props.majorName)}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                />
              </Link>
              <Link
                to={{
                  pathname: "/categories",
                  search: `?name=${toSlug(props.subjectName, true)}&id=${
                    props.subjectID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={props.subjectName}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                />
              </Link>
              <Link
                to={{
                  pathname: "/tags",
                  search: `?name=${toSlug(props.tagName, true)}&id=${
                    props.tagID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={props.tagName}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                />
              </Link>
            </Stack>
            <AuthorQA
              label={props.label}
              text={props.text}
              pending={props.pending}
              time={props.time}
              src={props.src}
              userId={props.userId}
            />
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
}
