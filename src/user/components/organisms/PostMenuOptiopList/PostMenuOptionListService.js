import React, { useEffect, useState } from "react";
import PostMenuOptionList from "./PostMenuOptionList";
import useAuth from "../../../hooks/useAuth";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import useProfile from "../../../hooks/useProfile";
export default function PostMenuOptionListService({ ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setIsAuthor, isAllowComment, setIsAllowComment, postDetail } =
    usePost();
  const [hasPermission, setHasPermisson] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { user } = useProfile();
  const auth = useAuth();
  const { slug } = useParams();
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
        navigate(-1, { replace: true });
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        navigate("/unauthorized", { replace: true });
      } else if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const toggleComment = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_TOGGLE_COMMENT,
        {
          postId: postDetail?.postId,
        }
      );
      if (response) {
        setIsAllowComment((prev) => !prev);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  let found = postDetail?.rewarder?.find((item) => item?.userId === auth?.id);
  let containsAll = postDetail?.postSkill?.every((obj) =>
    user?.skills?.includes(obj.skillName)
  );

  useEffect(() => {
    found = found === undefined ? false : true;
    if (!found && containsAll) {
      setHasPermisson(true);
    }
  }, [postDetail?.postId]);

  
  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="24" />
      </IconButton>
      <PostMenuOptionList
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        isAllowComment={isAllowComment}
        isEdited={props.isEdited}
        deletePost={deletePost}
        postDetail={postDetail}
        toggleComment={toggleComment}
        hasPermission={hasPermission}
        setHasPermisson={setHasPermisson}
      />
    </>
  );
}
