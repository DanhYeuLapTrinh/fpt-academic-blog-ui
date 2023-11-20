import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import ContentFiledContainer from "../../organisms/ContentField/ContentFiledContainer";
import usePostTag from "../../../hooks/usePostTag";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useContent from "../../../hooks/useContent";
import Text from "../../atoms/Text/Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function Write({ ...props }) {
  const { tag } = usePostTag();
  const { topic, setSkills, skills } = useContent();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Container sx={{ padding: "0 0 40px", minHeight: "calc(120vh - 93px)" }}>
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
      />
      {props.tag === "Q&A" ? (
        <>
          <TitleField normal />
          <ContentFiledContainer />
        </>
      ) : (
        <>
          <TitleField normal title />
          <Dropzone />
          <ContentFiledContainer />
        </>
      )}
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
          onChange={(event, value) => setSkills(value)}
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
        paddingTop={"30px"}
      >
        {tag !== "Q&A" && (
          <Button
            fullWidth
            onClick={props.handleSubmit}
            sx={{ padding: "10px" }}
            variant="outlined"
            value="draft"
          >
            Lưu bản nháp
          </Button>
        )}
        <Button
          fullWidth
          onClick={props.handleSubmit}
          sx={{ padding: "10px" }}
          variant="contained"
        >
          Gửi bài
        </Button>
      </Stack>
    </Container>
  );
}
