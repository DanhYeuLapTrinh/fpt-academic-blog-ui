import React from "react";
import { Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import ContentFiledContainer from "../../organisms/ContentField/ContentFiledContainer";
import usePostTag from "../../../hooks/usePostTag";

export default function Write({ ...props }) {
  const {tag} = usePostTag()
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
