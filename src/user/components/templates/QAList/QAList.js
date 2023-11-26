import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import QA from "../../organisms/QA/QA";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Text from "../../atoms/Text/Text";
import { timeConverter } from "../../../utils/StringMethod";

export default function QAList(props) {
  const [displayedQA, setDisplayedQA] = useState(5);
  const handleSeeMore = () => {
    setDisplayedQA((prev) => prev + 5);
  };
  const handleSeeLess = () => {
    setDisplayedQA(5);
  };
  return (
    <Box width={"740px"}>
      <SectionTitle title="Hỏi & Đáp" />
      <Stack spacing={"20px"}>
        {!props?.qaList
          ? Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={"100%"}
                    height={135}
                    sx={{ borderRadius: "10px" }}
                  />
                </div>
              ))
          : props?.qaList
              ?.slice(0, displayedQA)
              .map((item, index) => (
                <QA
                  slug={`/view/${item.slug}`}
                  label={item.accountName}
                  src={item.avatarURL}
                  time={timeConverter(item.dateOfPost)}
                  title={item.title}
                  description={item.description}
                  vote={item.numOfUpVote - item.numOfDownVote}
                  text={item.numberOfComment}
                  majorName={item?.category[0]?.categoryName}
                  majorID={item?.category[0]?.categoryId}
                  subjectName={item?.category[2]?.categoryName}
                  subjectID={item?.category[2]?.categoryId}
                  tagName={item?.tag.tagName}
                  tagID={item?.tag.tagId}
                  isRewarded={item?.is_rewarded}
                  rewarder={item?.rewarder}
                  userId={item?.userId}
                />
              ))}
        {!props?.qaList ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={740}
            height={39}
            sx={{ borderRadius: "10px" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "39px",
              bgcolor: "secondary.alt",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={
                displayedQA < props?.qaList?.length
                  ? handleSeeMore
                  : handleSeeLess
              }
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              {displayedQA < props?.qaList?.length ? (
                <Text fontSize="12px" color="primary.main">
                  Xem thêm
                </Text>
              ) : (
                <Text fontSize="12px" color="primary.main">
                  Thu nhỏ
                </Text>
              )}
            </IconButton>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
