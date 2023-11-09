import React, { useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box, IconButton, Paper, Popover, Stack, TextField } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function SearchPopper() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ position: "relative" }}>
      <IconButton color="primary" sx={{ m: "10px" }} onClick={handleClick}>
        <TuneRoundedIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 545, left: 952 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Paper sx={{ width: "740px", p: 3 }}>
          <Stack spacing={3}>
            <Stack direction={"row"} alignItems={'center'} spacing={5}>
              <Box flex={1}><Text>Tiêu đề: </Text></Box>
              <TextField sx={{flex: 10}} placeholder="Nhập tiêu đề bài viết..."/>
            </Stack>
            
          </Stack>
        </Paper>  
      </Popover>
    </div>
  );
}
