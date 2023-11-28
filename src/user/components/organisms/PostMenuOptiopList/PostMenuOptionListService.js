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
  const {
    setIsAuthor,
    postDetail,
    setPostDetail,
    hasPermission,
    setHasPermisson,
  } = usePost();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { skills } = useProfile();
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
        setPostDetail({
          ...postDetail,
          allowComment: !postDetail?.allowComment,
        });
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  let found = false;
  let containsAll = true;
  useEffect(() => {
    found = postDetail?.rewarder?.find((item) => item?.userId === auth?.id);
    containsAll = postDetail?.postSkill?.every((obj) =>
      skills?.includes(obj.skillName)
    );
    found = found === undefined ? false : true;
    console.log(found, containsAll);
    console.log(skills);
    if (!found && containsAll) {
      setHasPermisson(true);
    }
    return () => {
      setHasPermisson(false);
    };
  }, [skills]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="ph:dots-three-outline-fill" color="#444746" width="24" />
      </IconButton>
      <PostMenuOptionList
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
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
