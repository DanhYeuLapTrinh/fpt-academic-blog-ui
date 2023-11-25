import React from "react";
import PostInteraction from "./PostInteraction";

export default function PostInteractionService({ handleActions, ...props }) {
  return (
    <PostInteraction
      upvote={props.upvote}
      select={props.select}
      setSelect={props.setSelect}
      handleActions={handleActions}
    />
  );
}
