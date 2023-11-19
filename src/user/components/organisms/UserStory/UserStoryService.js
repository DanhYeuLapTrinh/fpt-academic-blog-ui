import React, { useEffect, useState } from "react";
import UserStory from "./UserStory";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useContent from "../../../hooks/useContent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserStoryService(props) {
  const [userStory, setUserStory] = useState();
  const [editedStory, setEditedStory] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const { charCount, setCharCount } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const maxCharLimit = 100;
  useEffect(() => {
    setUserStory(props.userStory);
    setEditedStory(props.userStory);
    setCharCount(props?.userStory?.length);
  }, [props.userStory]);

  const handleInputChange = (event) => {
    setEditedStory(event.target.value);
    setCharCount(event.target.value.length);
  };

  const handleSave = async () => {
    if (charCount < maxCharLimit && editedStory.trim().length > 0) {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_EDIT_PROFILE,
          {
            userStory: editedStory,
          }
        );
        if (response?.status === 200) {
          setUserStory(editedStory);
          setIsEditing(false);
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    } else if (editedStory.trim().length === 0) {
      toast.error("Vui lòng nhập nội dung trước khi lưu");
    } else if (charCount >= maxCharLimit) {
      toast.error("Nội dung vượt quá giới hạn ký tự");
    }
  };

  const handleCancel = () => {
    setEditedStory(userStory);
    setIsEditing(false);
  };
  return (
    <UserStory
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      setUserStory={setUserStory}
      setEditedStory={setEditedStory}
      editedStory={editedStory}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
      handleCancel={handleCancel}
      userId={props.userId}
      focus={focus}
      setFocus={setFocus}
      charCount={charCount}
      maxCharLimit={maxCharLimit}
    />
  );
}
