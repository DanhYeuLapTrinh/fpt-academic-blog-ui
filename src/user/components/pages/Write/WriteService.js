import useAuth from "../../../hooks/useAuth";
import usePostTag from "../../../hooks/usePostTag";
import { getFirstPTag, toSlug } from "../../../utils/StringMethod";
import React, { useCallback, useEffect, useState } from "react";
import Write from "./Write";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useContent from "../../../hooks/useContent";

export default function WriteService() {
  const {
    title,
    setTitle,
    charCount,
    coverURL,
    setCoverURL,
    content,
    setContent,
  } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useAuth();
  const [disabled, setDisabled] = useState(true);
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
    subjectID,
    setSubjectID,
    tagID,
    setTagID,
  } = usePostTag();
  useEffect(() => {
    setCoverURL(JSON.parse(localStorage.getItem("coverURL")) || "");
    setTitle(JSON.parse(localStorage.getItem("title")) || "");
    setContent(JSON.parse(localStorage.getItem("content")) || "");
  }, []);

  useEffect(() => {
    if (
      major &&
      semester &&
      subjectID &&
      tagID &&
      coverURL &&
      title &&
      content &&
      charCount < 100
    ) {
      setDisabled(false);
    } else setDisabled(true);
  }, [major, semester, subject, tag, coverURL, title, content, charCount]);

  const handleMajorChange = useCallback((e) => {
    setMajor(e.target.value);
    setSemester();
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  }, []);

  const handleSemesterChange = useCallback((e) => {
    setSemester(e.target.value);
    setSubject();
    setSubjectID();
    setTag();
    setTagID();
  }, []);

  const handleSubmit = useCallback(async () => {
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
  }, []);

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

  return (
    <Write
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
      setSubjectID={setSubjectID}
      setTagID={setTagID}
      handleMajorChange={handleMajorChange}
      handleSemesterChange={handleSemesterChange}
      handleSubmit={handleSubmit}
      disabled={disabled}
    />
  );
}
