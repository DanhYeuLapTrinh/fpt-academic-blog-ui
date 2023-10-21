import React from "react";
import NavOption from "../../atoms/NavOption/NavOption";
import { Divider, List, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";

export default function NavList({ options }) {
  return (
    <List>
      <Stack direction={"row"} spacing={1}>
          <Link to={"/"}><NavOption>Trang chủ</NavOption></Link>
          <NavOption>Bảng tin</NavOption>
          <NavOption>Tin tức</NavOption>
          <NavOption>Về chúng tôi</NavOption>
      </Stack>
    </List>
  );
}
