import React, { useEffect, useState } from "react";
import PostInteraction from "./PostInteraction";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

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
