import React from "react";
import PostInteraction from "./PostInteraction";

export default function PostInteractionService({handleActions, ...props}) {
  return (
    <PostInteraction
      vote={props.vote}
      select={props.select}
      setSelect={props.setSelect}
      handleActions={handleActions}
    />
  );
}
