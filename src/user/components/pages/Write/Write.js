import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePostTag from "../../../hooks/usePostTag";

export default function Write() {
  const axiosPrivate = useAxiosPrivate();
  const {
    data,
    setData,
    tagList,
    setTagList,
    major,
    setMajor,
    semester,
    setSemester,
    subject,
    setSubject,
    tag,
    setTag,
    setMajorID,
    setSemesterID,
    setSubjectID,
    setTagID,
  } = usePostTag();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("categories");
        const tagList = await axiosPrivate.get("tags");

        setData(response.data);
        setTagList(tagList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleMajorChange = (e) => {
    setMajor(e.target.value);
    setSemester();
    setSemesterID();
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  };
  return (
    <Container sx={{ padding: "0 0 40px" }}>
      <PostFilter
        data={data}
        setData={setData}
        tagList={tagList}
        setTagList={tagList}
        major={major}
        setMajor={setMajor}
        semester={semester}
        setSemester={setSemester}
        subject={subject}
        setSubject={setSubject}
        tag={tag}
        setTag={setTag}
        setMajorID={setMajorID}
        setSemesterID={setSemesterID}
        setSubjectID={setSubjectID}
        setTagID={setTagID}
        handleMajorChange={handleMajorChange}
        handleSemesterChange={handleSemesterChange}
      />
      <TitleField />
      <Dropzone />
      <ContentField />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        paddingTop={"30px"}
      >
        <Button variant="outlined">Lưu bản nháp</Button>
        <Button variant="contained">Gửi bài</Button>
      </Stack>
    </Container>
  );
}
