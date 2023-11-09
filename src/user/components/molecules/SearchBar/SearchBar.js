import { IconButton, InputBase, Paper } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";
import SearchPopperService from "../../organisms/SearchPopper/SearchPopperService";

export default function SearchBar() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "740px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: '10px'
      }}
    >
      <IconButton sx={{ m: "10px 5px 10px 10px", color: "primary.main" }}>
        <SearchRoundedIcon />
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Nhấn để tìm kiếm" />
      <SearchPopperService/>
    </Paper>
  );
}
