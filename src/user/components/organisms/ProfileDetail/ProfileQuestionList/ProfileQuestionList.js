import React from "react";
import Text from "../../../atoms/Text/Text";
import QA from "../../QA/QA";
import {Stack } from "@mui/material";
import { timeConverter } from "../../../../utils/StringMethod";
import { Icon } from '@iconify/react';

export default function ProfileQuestionList(props) {
  return (
    <>
      <Text fontSize="23px">Câu hỏi</Text>
      {props?.qaList?.length > 0 ? (
        props?.qaList?.map((item) => (
          <QA
            key={item.postId}
            full
            bg="secondary.main"
            title={item?.title}
            description={item?.description}
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
            slug={`/view/${item?.slug}`}
          />
        ))
      ) : (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <Stack alignItems={"center"} spacing={1}>
            <Icon
              icon="mdi:border-none-variant"
              color="#c3c3c3"
              width="50"
              height="50"
            />
            <Text color="lightText.main">Chưa có câu hỏi nào được đăng</Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}
