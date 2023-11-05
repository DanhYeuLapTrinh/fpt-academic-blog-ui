import React, { useState } from "react";
import LecturerMenu from "./LecturerMenu";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";

export default function LecturerMenuService(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setApprovedPosts } = useManagePost();
  const open = Boolean(anchorEl);
  const axiosPrivate = useAxiosPrivate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAction = () => {
    try {
      if (props.isRewarded) {
        const removeReward = async () => {
          let response = await axiosPrivate.post("lecturer/reward/remove", {
            postId: props.postId,
          });
          if (response) {
            
          }
        };
        removeReward();
      } else {
        const addReward = async () => {
          await axiosPrivate.post("lecturer/reward/add", {
            postId: props.postId,
          });
        };
        addReward();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LecturerMenu
      text={props.isRewarded ? "Xóa phần thưởng" : "Trao thưởng"}
      handleClick={handleClick}
      handleClose={handleClose}
      handleAction={handleAction}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      open={open}
    />
  );
}
