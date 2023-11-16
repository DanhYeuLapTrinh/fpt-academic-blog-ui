import React, { createContext, useState } from "react";
const ContentContext = createContext();
export default function ContentProvider({ children }) {
  const [title, setTitle] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [coverURL, setCoverURL] = useState("");
  const [content, setContent] = useState("");
  const [wordcount, setWordcount] = useState(0);
  const [file, setFile] = useState("");
  const [topic, setTopic] = useState([]);
  const [skills, setSkills] = useState([]);
  return (
    <ContentContext.Provider
      value={{
        title,
        setTitle,
        charCount,
        setCharCount,
        coverURL,
        setCoverURL,
        content,
        setContent,
        wordcount,
        setWordcount,
        file,
        setFile,
        topic,
        setTopic,
        skills,
        setSkills,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}
export { ContentContext };
