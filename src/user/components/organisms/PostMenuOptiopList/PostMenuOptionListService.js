import React, { useEffect, useState } from "react";
import PostMenuOptionList from "./PostMenuOptionList";
import useAuth from "../../../hooks/useAuth";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
export default function PostMenuOptionListService(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (auth?.id === props?.userId) {
      setIsAuthor(true);
    }
  }, [auth, props]);
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="24" />
      </IconButton>
      <PostMenuOptionList
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        isAuthor={isAuthor}
        allowComment={props.allowComment}
        isEdited={props.isEdited}
      />
    </>
  );
}
