import { Container, Stack } from "@mui/material";
import React from "react";
import QA from "../../organisms/QA/QA";
import { Link } from "react-router-dom";
import { timeConverter } from "../../../utils/StringMethod";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";

export default function PendingQuestions(props) {
  return (
    <Stack p={"20px 0"} spacing={2}>
      {props.questions?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      {props.questions?.map((item) => (
        <QA
          full
          title={item?.title}
          description={item?.description}
          pending
          majorName={item?.category[0]?.categoryName}
          majorID={item?.category[0]?.categoryId}
          subjectName={item?.category[2]?.categoryName}
          subjectID={item?.category[2]?.categoryId}
          tagName={item?.tag.tagName}
          tagID={item?.tag.tagId}
          time={timeConverter(item?.dateOfPost)}
          src={item?.avatarURL}
          userId={item?.userId}
          label={item?.accountName}
          slug={item?.slug}
        />
      ))}
    </Stack>
  );
}
