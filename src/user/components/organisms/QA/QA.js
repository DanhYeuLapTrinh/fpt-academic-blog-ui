import { Box, Stack } from "@mui/material";
import React from "react";
import QAVote from "../../molecules/QAVote/QAVote";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import Author from "../../molecules/Author/Author";
import AuthorQA from "../../molecules/AuthorQA/AuthorQA";
import Wrapper from "../../atoms/Wrapper/Wrapper";

export default function QA(props) {
  return (
    <Box
      sx={{
        width: "740px",
        height: "135px",
        borderRadius: "10px",
        bgcolor: "secondary.alt",
        display: "flex",
        p: " 15px 15px 0px 20px",
      }}
    >
      {!props.pending && (
        <Box display={"flex"} alignItems={"center"}>
          <QAVote />
        </Box>
      )}
      <Box sx={{ p: "0 15px" }}>
        <Stack height={"100%"} justifyContent={"space-between"}>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="16px" lineHeight="20px">
              The question that was asked on superuser and migrated to
              stackoverflow and then he deleted on stackoverflow, cannot be
              undeleted on
            </Text>
          </Wrapper>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="12px" fontWeight="400" lineHeight="16px">
              The question that was asked on superuser and migrated to
              stackoverflow and then deleted on stackoverflow, cannot be
              undeleted on stackoverflow
            </Text>
          </Wrapper>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={"12px"}>
              <PostTag
                fontSize="11px"
                color={props.tagColor ? props.tagColor : "primary.main"}
              />
              <PostTag
                fontSize="11px"
                color={props.tagColor ? props.tagColor : "primary.main"}
              />
              <PostTag
                fontSize="11px"
                color={props.tagColor ? props.tagColor : "primary.main"}
              />
            </Stack>
            <AuthorQA text="11" />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
