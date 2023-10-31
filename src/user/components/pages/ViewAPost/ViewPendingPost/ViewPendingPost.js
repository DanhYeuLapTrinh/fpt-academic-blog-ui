import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function ViewPendingPost() {
  const {slug} = useParams();
  return <Container>
    {slug || "ko co"}
  </Container>;
}
