import React from "react";
import NavOption from "../../atoms/NavOption/NavOption";
import { List, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavList() {
  return (
    <List>
      <Stack direction={"row"} spacing={1}>
          <Link to={"/"} style={{textDecoration: 'none'}}><NavOption>Trang chủ</NavOption></Link>
          <NavOption>Bảng tin</NavOption>
          <NavOption>Tin tức</NavOption>
          <NavOption>Về chúng tôi</NavOption>
      </Stack>
    </List>
  );
}
