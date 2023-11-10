import { Box, List, Stack } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavOption from "../../atoms/NavOption/NavOption";
import useProfile from "../../../hooks/useProfile";

export default function ProfileNavList(props) {
  const {selected, setSelected} = useProfile()
  return (
    <Stack direction={"row"} spacing={"5px"}>
      <Link
        to={`/profile/${props.slug}`}
        style={{ textDecoration: "none" }}
        onClick={() => setSelected("Bài viết")}
      >
        <NavOption padding="12px 14px">Bài viết</NavOption>
        {selected === "Bài viết" && (
          <Box
            sx={{
              width: "100%",
              height: "3px",
              bgcolor: "primary.main",
              borderRadius: "10px 10px 0 0",
            }}
          />
        )}
      </Link>
      <Link
        to={`/profile/${props.slug}/question`}
        style={{ textDecoration: "none" }}
        onClick={() => setSelected("Câu hỏi")}
      >
        <NavOption padding="12px 14px">Câu hỏi</NavOption>
        {selected === "Câu hỏi" && (
          <Box
            sx={{
              width: "100%",
              height: "3px",
              bgcolor: "primary.main",
              borderRadius: "10px 10px 0 0",
            }}
          />
        )}
      </Link>
      <Link
        to={`/profile/${props.slug}/follower`}
        style={{ textDecoration: "none" }}
        onClick={() => setSelected("Người theo dõi")}
      >
        <NavOption padding="12px 14px">Người theo dõi</NavOption>
        {selected === "Người theo dõi" && (
          <Box
            sx={{
              width: "100%",
              height: "3px",
              bgcolor: "primary.main",
              borderRadius: "10px 10px 0 0",
            }}
          />
        )}
      </Link>
      <Link
        to={`/profile/${props.slug}/following`}
        style={{ textDecoration: "none" }}
        onClick={() => setSelected("Đang theo dõi")}
      >
        <NavOption padding="12px 14px">Đang theo dõi</NavOption>
        {selected === "Đang theo dõi" && (
          <Box
            sx={{
              width: "100%",
              height: "3px",
              bgcolor: "primary.main",
              borderRadius: "10px 10px 0 0",
            }}
          />
        )}
      </Link>
    </Stack>
  );
}
