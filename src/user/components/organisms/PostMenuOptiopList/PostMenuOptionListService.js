import React, { useEffect, useState } from "react";
import PostMenuOptionList from "./PostMenuOptionList";
import useAuth from "../../../hooks/useAuth";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
export default function PostMenuOptionListService({postDetail, ...props}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const {isAuthor, setIsAuthor} = usePost()
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const {slug} = useParams()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (auth?.id === props.userId) {
      setIsAuthor(true);
    }
    return () => setIsAuthor(false);
  }, [postDetail?.userId, slug]);

  const deletePost = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_DELETE_POST,
        {
          postId: postDetail?.postId,
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
        allowComment={props.allowComment}
        isEdited={props.isEdited}
        deletePost={deletePost}
        postDetail={postDetail}
      />
    </>
  );
}
