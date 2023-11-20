import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../atoms/Text/Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import ContentField from "../../organisms/ContentField/ContentField";
import { useNavigate } from "react-router-dom";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import useContent from "../../../hooks/useContent";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
export default function EditPost({ post, ...props }) {
  const [isSaving, setIsSaving] = useState("Chưa lưu");
  const { topic, setTopic, setSkills, skills } = useContent();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const navigate = useNavigate();
  useEffect(() => {
    const filteredTopics = topic.filter(
      (topic) => !skills.map((s) => s.id).includes(topic.id)
    );
    setTopic(filteredTopics);
  }, [skills]);
  const handleSelect = (e, value) => {
    setSkills(value);
    let removedItem = skills?.find((s) => !value?.find((v) => v.id === s.id));
    if (removedItem) {
      setTopic((prevTopic) => [...prevTopic, removedItem]);
    }
  };
  return (
    <Container sx={{ padding: "0 0 40px", minHeight: "calc(130vh - 93px)" }}>
      <PostFilter
        data={props.data}
        setData={props.setData}
        tagList={props.tagList}
        major={props.major}
        setMajor={props.setMajor}
        semester={props.semester}
        setSemester={props.setSemester}
        subject={props.subject}
        setSubject={props.setSubject}
        tag={props.tag}
        setTag={props.setTag}
        setSubjectID={props.setSubjectID}
        setTagID={props.setTagID}
        handleMajorChange={props.handleMajorChange}
        handleSemesterChange={props.handleSemesterChange}
        editQA
      />
      <TitleField edited title />
      {props.tag !== "Q&A" && <Dropzone />}
      <ContentField
        edited
        setIsSaving={setIsSaving}
        isSaving={isSaving}
        handleImage={props.handleImage}
      />
      <Box minHeight={"50px"} paddingTop={"30px"}>
        <Autocomplete
          multiple
          options={topic}
          value={skills}
          fullWidth
          disableCloseOnSelect
          popupIcon={<KeyboardArrowDownIcon />}
          getOptionLabel={(option) => option.skillName}
          renderOption={(props, option, { selected }) => (
            <Text {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <Text>{option.skillName}</Text>
            </Text>
          )}
          onChange={(event, value) => handleSelect(event, value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Chọn từ khóa để chúng tôi phân loại bài viết tốt hơn"
            />
          )}
        />
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        padding={"30px 0 100px"}
      >
        <Button
          fullWidth
          sx={{ padding: "10px" }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Hủy
        </Button>
        <Button
          fullWidth
          onClick={props.handleSubmit}
          sx={{ padding: "10px" }}
          variant="contained"
        >
          Gửi bản chỉnh sửa
        </Button>
      </Stack>
    </Container>
  );
}
