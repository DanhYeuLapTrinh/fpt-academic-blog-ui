import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField } from "@mui/material";

function SearchUserByFullname({ handleSearchUser }) {
  return (
    <Grid item xs={10}>
      <TextField
        className="search-input"
        placeholder="Tìm kiếm tài khoản..."
        type="text"
        variant="outlined"
        fullWidth
        sx={{
          padding: 1.5,
          fontSize: 13,
        }}
        onChange={handleSearchUser}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
        }}
      />
    </Grid>
  );
}

export default SearchUserByFullname;
