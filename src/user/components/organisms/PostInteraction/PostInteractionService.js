import React from "react";
import PostInteraction from "./PostInteraction";

export default function PostInteractionService({ handleActions, ...props }) {
  return (
    <PostInteraction
      upvote={props.upvote}
      downvote={props.downvote}
      select={props.select}
      setSelect={props.setSelect}
      handleActions={handleActions}
    />
  );
}
