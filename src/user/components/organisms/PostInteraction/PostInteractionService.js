import React from "react";
import PostInteraction from "./PostInteraction";

export default function PostInteractionService(props) {
  return (
    <PostInteraction
      vote={props.vote}
      select={props.select}
      setSelect={props.setSelect}
      handleUpvote={props.handleUpvote}
      handleDownvote={props.handleDownvote}
    />
  );
}
