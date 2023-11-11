import { Box, IconButton, Stack } from "@mui/material";
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
        {props?.qaList?.slice(0, displayedQA).map((item, index) => (
          <QA
            slug={`/view/${item.slug}`}
            label={item.accountName}
            src={item.avatarURL}
            time={timeConverter(item.dateOfPost)}
            title={item.title}
            description={item.description}
            vote={item.numOfUpVote - item.numOfDownVote}
          />
        ))}
        <IconButton
          onClick={
            displayedQA < props?.qaList?.length ? handleSeeMore : handleSeeLess
          }
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
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
            {displayedQA < props?.qaList?.length ? (
              <Text fontSize="12px" color="primary.main">
                Xem thêm
              </Text>
            ) : (
              <Text fontSize="12px" color="primary.main">
                Thu nhỏ
              </Text>
            )}
          </Box>
        </IconButton>
      </Stack>
    </Box>
  );
}
