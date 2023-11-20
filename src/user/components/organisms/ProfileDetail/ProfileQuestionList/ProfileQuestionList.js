import React, { useState } from "react";
import Text from "../../../atoms/Text/Text";
import QA from "../../QA/QA";
import { MenuItem, Select, Stack } from "@mui/material";
import { timeConverter } from "../../../../utils/StringMethod";
import { Icon } from "@iconify/react";
import useAuth from "../../../../hooks/useAuth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useParams } from "react-router-dom";

export default function ProfileQuestionList(props) {
  const [type, setType] = useState("Câu hỏi của tôi");
  const auth = useAuth();
  const { id } = useParams();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Text fontSize="23px">Câu hỏi</Text>
        {props?.userId === auth.id && (
          <>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Câu hỏi của tôi">
                <Text fontSize="14px">Câu hỏi của tôi</Text>
              </MenuItem>
              <MenuItem value="Câu hỏi đang chờ">
                <Text fontSize="14px">Câu hỏi đang chờ</Text>
              </MenuItem>
            </Select>
          </>
        )}
      </Stack>
      {type === "Câu hỏi của tôi" &&
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
        ))}
      {type === "Câu hỏi đang chờ" &&
        id !== auth.id &&
        props?.pendingQAList?.map((item) => (
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
            slug={`/edit/${item?.slug}`}
          />
        ))}
      {!props.qaList?.length > 0 && type === "Câu hỏi của tôi" && (
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
      {props?.pendingQAList?.length === 0 && type === "Câu hỏi đang chờ" && (
        <Stack justifyContent="center" alignItems="center" height="100%">
          <Stack alignItems="center" spacing={1}>
            <Icon
              icon="mdi:border-none-variant"
              color="#c3c3c3"
              width="50"
              height="50"
            />
            <Text color="lightText.main">
              Chưa có câu hỏi nào trong danh sách chờ
            </Text>
          </Stack>
        </Stack>
      )}
    </>
  );
}
