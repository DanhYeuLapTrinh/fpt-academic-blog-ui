import React, { useState } from "react";
import MyMenuOptionList from "./MyMenuOptionList";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import useAuth from "../../../hooks/useAuth";
export default function MyMenuOptionListService(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="18" />
      </IconButton>
      <MyMenuOptionList
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
      />
    </>
  );
}
