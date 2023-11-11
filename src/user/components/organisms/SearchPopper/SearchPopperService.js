import React, { useState } from "react";
import SearchPopper from "./SearchPopper";
import usePostTag from "../../../hooks/usePostTag";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function SearchPopperService() {
  const [inputTitle, setInputTitle] = useState("");
  const axisoPrivate = useAxiosPrivate();
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
  return <SearchPopper />;
}
