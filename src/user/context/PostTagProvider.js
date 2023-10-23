import { createContext, useState } from "react";

const PostTagContext = createContext();

export default function PostTagProvider({ children }) {
  const [data, setData] = useState([]);
  const [tagList, setTagList] = useState([])
  const [major, setMajor] = useState();
  const [majorID, setMajorID] = useState();
  const [semester, setSemester] = useState();
  const [semesterID, setSemesterID] = useState();
  const [subject, setSubject] = useState();
  const [subjectID, setSubjectID] = useState();
  const [tag, setTag] = useState();
  const [tagID, setTagID] = useState();
  return (
    <PostTagContext.Provider
      value={{
        data,
        setData,
        tagList,
        setTagList,
        major,
        setMajor,
        majorID,
        setMajorID,
        semester,
        setSemester,
        semesterID,
        setSemesterID,
        subject,
        setSubject,
        subjectID,
        setSubjectID,
        tag,
        setTag,
        tagID,
        setTagID,
      }}
    >
      {children}
    </PostTagContext.Provider>
  );
}

export {PostTagContext}