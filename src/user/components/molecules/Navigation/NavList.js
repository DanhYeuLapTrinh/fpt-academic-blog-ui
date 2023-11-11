import React from "react";
import NavOption from "../../atoms/NavOption/NavOption";
import { List, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavList() {
  return (
    <List>
      <Stack direction={"row"} spacing={1}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <NavOption padding="10px">Trang chủ</NavOption>
        </Link>
        <Link to={"/feed"} style={{ textDecoration: "none" }}>
          <NavOption padding="10px">Bảng tin</NavOption>
        </Link>
        <Link to={"/news"} style={{ textDecoration: "none" }}><NavOption padding="10px">Tin tức</NavOption></Link>
        <NavOption padding="10px">Về chúng tôi</NavOption>
      </Stack>
    </List>
  );
}
