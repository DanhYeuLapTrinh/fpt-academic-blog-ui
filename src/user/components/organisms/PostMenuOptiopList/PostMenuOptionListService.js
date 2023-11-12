import React, { useEffect, useState } from "react";
import PostMenuOptionList from "./PostMenuOptionList";
import useAuth from "../../../hooks/useAuth";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
export default function PostMenuOptionListService(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
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

  const deletePost = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_DELETE_POST,
        {
          postId: props.postId,
        }
      );

      if (response) {
        navigate(`/profile/${auth.id}`, { replace: true });
      }
    } catch (error) {
      if(error.response.status === 404){
        navigate("/unauthorized", { replace: true });
      }
    }
  };
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
        deletePost={deletePost}
      />
    </>
  );
}
