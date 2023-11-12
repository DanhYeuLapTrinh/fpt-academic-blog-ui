import { Button, Container, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import ContentField from "../../organisms/ContentField/ContentField";
import useContent from "../../../hooks/useContent";
export default function EditPost({ post,...props }) {
  const [isSaving, setIsSaving] = useState("Chưa lưu");

  return (
    <Container sx={{ padding: "0 0 40px" }}>
      {post?.category && (
        <Stack direction={"row"} spacing={1} sx={{ padding: "30px 0 20px" }}>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            disabled
            value={post?.category[0].categoryName}
          >
            <MenuItem value={post?.category[0].categoryName}>
              <Text fontSize="14px">{post?.category[0].categoryName}</Text>
            </MenuItem>
          </Select>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            disabled
            value={post?.category[1].categoryName}
          >
            <MenuItem value={post?.category[1].categoryName}>
              <Text fontSize="14px">{post?.category[1].categoryName}</Text>
            </MenuItem>
          </Select>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            disabled
            value={post?.category[2].categoryName}
          >
            <MenuItem value={post?.category[2].categoryName}>
              <Text fontSize="14px">{post?.category[2].categoryName}</Text>
            </MenuItem>
          </Select>
          <Select
            sx={{ height: "30px", pr: "5px" }}
            IconComponent={KeyboardArrowDownIcon}
            disabled
            value={post?.tag.tagName}
          >
            <MenuItem value={post?.tag.tagName}>
              <Text fontSize="14px">{post?.tag.tagName}</Text>
            </MenuItem>
          </Select>
        </Stack>
      )}
      <TitleField edited title />
      <Dropzone />
      <ContentField edited setIsSaving={setIsSaving} isSaving={isSaving} handleImage={props.handleImage}/>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        paddingTop={"30px"}
      >
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
