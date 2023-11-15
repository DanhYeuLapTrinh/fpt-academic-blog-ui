import {
  Button,
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
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import usePostTag from "../../../hooks/usePostTag";
export default function EditDraft({ draft, ...props }) {
  const [isSaving, setIsSaving] = useState("Chưa lưu");
  const { tag } = usePostTag();
  return (
    <Container sx={{ padding: "0 0 40px" }}>
      {draft?.category && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          spacing={1}
          sx={{ padding: "30px 0 20px" }}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={1}>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              disabled
              value={draft?.category[0].categoryName}
            >
              <MenuItem value={draft?.category[0].categoryName}>
                <Text fontSize="14px">{draft?.category[0].categoryName}</Text>
              </MenuItem>
            </Select>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              disabled
              value={draft?.category[1].categoryName}
            >
              <MenuItem value={draft?.category[1].categoryName}>
                <Text fontSize="14px">{draft?.category[1].categoryName}</Text>
              </MenuItem>
            </Select>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              disabled
              value={draft?.category[2].categoryName}
            >
              <MenuItem value={draft?.category[2].categoryName}>
                <Text fontSize="14px">{draft?.category[2].categoryName}</Text>
              </MenuItem>
            </Select>
            <Select
              sx={{ height: "30px", pr: "5px" }}
              IconComponent={KeyboardArrowDownIcon}
              disabled
              value={draft?.tag.tagName}
            >
              <MenuItem value={draft?.tag.tagName}>
                <Text fontSize="14px">{draft?.tag.tagName}</Text>
              </MenuItem>
            </Select>
          </Stack>
          <Tooltip title="Xóa bản nháp">
            <IconButton
              sx={{ bgcolor: "red" }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={props.deleteDraft}
            >
              <Icon
                icon="ant-design:delete-outlined"
                color="white"
                width="24"
              />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
      <TitleField draft title />
      <Dropzone />
      <ContentField
        draft
        setIsSaving={setIsSaving}
        isSaving={isSaving}
        handleImage={props.handleImage}
      />
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
