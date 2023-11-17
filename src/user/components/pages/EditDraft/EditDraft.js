import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Text from "../../atoms/Text/Text";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import usePostTag from "../../../hooks/usePostTag";
import PopupEdit from "../../organisms/PopupEdit/PopupEdit";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useContent from "../../../hooks/useContent";
export default function EditDraft({ draft, ...props }) {
  const [isSaving, setIsSaving] = useState("Chưa lưu");
  const { topic, setTopic, setSkills, skills } = useContent();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { tag } = usePostTag();

  useEffect(() => {
    const filtered = topic.filter((t) => !skills?.find((s) => s.id === t.id));
    setTopic(filtered);
  }, [skills]);

  const handleAutocompleteChange = (event, value) => {
    setSkills(value);
    const removedItem = skills?.find((s) => !value?.find((v) => v.id === s.id));
    if (removedItem) {
      setTopic((prevTopic) => [...prevTopic, removedItem]);
    }
  };
  return (
    <Container sx={{ padding: "0 0 40px" }}>
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

      {draft.reasonOfDecline && (
        <PopupEdit
          bgcolor="primary.main"
          label="Lý do từ chối"
          content={draft.reasonOfDecline}
          color="secondary.main"
        />
      )}
      <TitleField draft title />
      <Dropzone />
      <ContentField
        draft
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
          onChange={(event, value) => handleAutocompleteChange(event, value)}
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
        {tag !== "Q%A" && (
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
