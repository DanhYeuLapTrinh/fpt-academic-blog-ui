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
  Divider,
  IconButton,
  MenuItem,
  Paper,
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
  const [open, setOpen] = useState(false);
  const { topic, setTopic, setSkills, skills } = useContent();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { tag } = usePostTag();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

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
    <Container sx={{ padding: "0 0 40px", minHeight: "calc(130vh - 93px)" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
        {draft?.reasonOfDecline && (
          <>
            <Box sx={{ padding: "30px 0 20px" }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ textTransform: "none", height: "30px" }}
                onClick={handleClickOpen}
              >
                Xem lý do từ chối
              </Button>
            </Box>
            <Dialog open={open} maxWidth="lg">
              <DialogContent sx={{ p: 0 }}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  p={2}
                  sx={{ minWidth: "500px" }}
                  justifyContent={"space-between"}
                >
                  <Text fontSize="26px">Lý do từ chối</Text>
                  <IconButton
                    sx={{
                      p: "8px",
                    }}
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    onClick={handleCloseDialog}
                  >
                    <Icon icon="octicon:x-12" color="#444746 " width="20" />
                  </IconButton>
                </Stack>
                <Divider orientation="horizontal" />
                <Box sx={{ p: 2 }}>
                  <Text>{draft?.reasonOfDecline}</Text>
                </Box>
              </DialogContent>
            </Dialog>
          </>
        )}
      </Stack>
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
        padding={"30px 0 100px"}
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
