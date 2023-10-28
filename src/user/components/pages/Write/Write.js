import React, { useEffect } from "react";
import { Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePostTag from "../../../hooks/usePostTag";
import { useNavigate } from "react-router-dom";
import { getFirstPTag, toSlug } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";

export default function Write() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
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
    subjectID,
    tagID,
    setSubjectID,
    setTagID,
  } = usePostTag();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          process.env.REACT_APP_CATEGORIES_API
        );
        const tagList = await axiosPrivate.get(process.env.REACT_APP_TAGS_API);

        setData(response.data);
        setTagList(tagList.data);
      } catch (error) {
        if (!error?.response) {
          console.log("No server response");
        } else if (error.response?.status === 403) {
          navigate("/login");
        } else if (error.response?.status === 401) {
          console.log(error);
        } else {
          console.log(error);
        }
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

  const handleSubmit = async () => {
    try {
      const slug = toSlug(JSON.parse(localStorage.getItem("title")));
      const description = getFirstPTag(
        JSON.parse(localStorage.getItem("content"))
      );
      const response = await axiosPrivate.post("users/request-post", {
        accountId: auth?.id,
        title: JSON.parse(localStorage.getItem("title")),
        description: description,
        content: JSON.parse(localStorage.getItem("content")),
        allowComment: true,
        categoryId: subjectID,
        tagId: tagID,
        imageURL: [],
        videoURL: [],
        coverURL: JSON.parse(localStorage.getItem("coverURL")),
        slug: slug,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestion = async () => {
    
  }
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
      {tag === "Q&A" ? (
        <>
          <TitleField />
          <ContentField />
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
              onClick={handleQuestion}
              sx={{ padding: "10px" }}
              variant="contained"
            >
              Gửi bài
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <TitleField title/>
          <Dropzone />
          <ContentField />

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
              onClick={handleSubmit}
              sx={{ padding: "10px" }}
              variant="contained"
            >
              Gửi bài
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
}
