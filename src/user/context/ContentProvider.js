import React, { createContext, useState } from 'react'
const ContentContext = createContext()
export default function ContentProvider({children}) {
  const [title, setTitle] = useState("")
  const [charCount, setCharCount] = useState(0);
  const [coverURL, setCoverURL] = useState()
  const [content, setContent] = useState("")
  const [wordcount, setWordcount] = useState(0)
  return (
    <ContentContext.Provider value={{title, setTitle, charCount, setCharCount, coverURL, setCoverURL, content, setContent, wordcount, setWordcount}}>
      {children}
    </ContentContext.Provider>
  )
}
export {ContentContext}