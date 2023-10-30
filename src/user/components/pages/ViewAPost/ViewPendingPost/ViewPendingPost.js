import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useContent from "../../../../hooks/useContent";

export default function ViewPendingPost() {
  const slug = useParams();
  const {postID} = useContent()
  return <Container>
    {postID || "ko co"}
  </Container>;
}
