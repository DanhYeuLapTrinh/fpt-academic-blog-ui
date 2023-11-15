import { IconButton, InputBase, Paper, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";
import SearchPopperService from "../../organisms/SearchPopper/SearchPopperService";

export default function SearchBar({
  handleSearchAccount,
  accountName,
  setAccountName,
  ...props
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: props.width ? props.width : "740px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <IconButton sx={{ m: "10px 5px 10px 10px", color: "primary.main" }}>
        <SearchRoundedIcon />
      </IconButton>
      <TextField
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        onKeyUp={handleSearchAccount}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Nhấn để tìm kiếm"
      />
      <SearchPopperService />
    </Paper>
  );
}
