import React, { createContext, useState } from 'react'
const ContentContext = createContext()
export default function ContentProvider({children}) {
  const [title, setTitle] = useState("")
  const [charCount, setCharCount] = useState(0);
  const [coverURL, setCoverURL] = useState()
  const [content, setContent] = useState("")
  return (
    <ContentContext.Provider value={{title, setTitle, charCount, setCharCount, coverURL, setCoverURL, content, setContent}}>
      {children}
    </ContentContext.Provider>
  )
}
export {ContentContext}