import React from "react";
import { Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import ContentFiledContainer from "../../organisms/ContentField/ContentFiledContainer";

export default function Write({...props}) {
  return (
    <Container sx={{ padding: "0 0 40px" }}>
      <PostFilter
        data={props.data}
        setData={props.setData}
        tagList={props.tagList}
        setTagList={props.tagList}
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
          <TitleField/>
          <ContentFiledContainer/>
        </>
      ) : (
        <>
          <TitleField title />
          <Dropzone />
          <ContentFiledContainer/>
        </>
      )}
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        paddingTop={"30px"}
      >
        <Button sx={{ padding: "10px" }} variant="outlined">
          Lưu bản nháp
        </Button>
        <Button
          onClick={props.handleSubmit}
          sx={{ padding: "10px" }}
          variant="contained"
          disabled={props.disabled}
        >
          Gửi bài
        </Button>
      </Stack>
    </Container>
  );
}
