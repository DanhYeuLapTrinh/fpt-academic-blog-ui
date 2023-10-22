import { createContext } from "react";

const PostTagContext= createContext()

export default function PostTagProvider({children}) {
  return (
    <div>PostTagProvider</div>
  )
}
