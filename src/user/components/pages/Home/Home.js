import React from "react";
import Header from "../../organisms/Header/Header";
import { Divider } from "@mui/material";

export default function Home() {
  return (
    <>
      <Header/>
      <Divider orientation="horizontal" sx={{width: '100%'}}/>
    </>
  );
}
