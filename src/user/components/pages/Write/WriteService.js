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
    setTitle,
    charCount,
    coverURL,
    setCoverURL,
    content,
    setContent,
    wordcount,
  } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
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
      const response = await axiosPrivate.post(
        process.env.REACT_APP_CREATE_POST,
        {
          accountId: auth?.id,
          title: JSON.parse(localStorage.getItem("title")),
          description: description,
          content: JSON.parse(localStorage.getItem("content")),
          allowComment: true,
          categoryId: subjectID,
          tagId: tagID,
          coverURL: JSON.parse(localStorage.getItem("coverURL")),
          slug: slug,
          length: wordcount,
        }
      );
    } catch (error) {
      console.log(error);
      // Phần này xử lý lỗi
    }
  }, [tagID, subjectID]);

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
        } else if (error?.response?.status === 403) {
          navigate("/login");
        } else if (error?.response?.status === 401) {
          // Xử lý sau
          console.log(error);
        } else {
          // Xử lý sau
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
      setTagList={setTagList}
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
      disabled={
        !major ||
        !semester ||
        !subjectID ||
        !tagID ||
        !coverURL ||
        !(charCount >= 30) ||
        !content ||
        !(wordcount >= 30)
      }
    />
  );
}
