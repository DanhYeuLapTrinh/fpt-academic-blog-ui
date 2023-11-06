import { Container, Stack } from "@mui/material";
import React from "react";
import QA from "../../organisms/QA/QA";
import { Link } from "react-router-dom";
import { getFirstChar, timeConverter } from "../../../utils/StringMethod";

export default function PendingQuestions(props) {
  return (
    <Stack p={"20px 0"} spacing={2}>
      {props.questions?.map((item) => (
        <QA
          full
          title={item?.title}
          description={item?.description}
          pending
          major={getFirstChar(item?.category[0])}
          subject={item?.category[1]}
          tag={item?.tag}
          time={timeConverter(item?.dateOfPost)}
          src={item?.avatarURL}
          label={item?.accountName}
          slug={item?.slug}
        />
      ))}
    </Stack>
  );
}
