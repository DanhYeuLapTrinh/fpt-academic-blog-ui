import React, { useEffect, useState } from "react";
import UserStory from "./UserStory";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function UserStoryService(props) {
  const [userStory, setUserStory] = useState();
  const [editedStory, setEditedStory] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    setUserStory(props.userStory);
    setEditedStory(props.userStory);
  }, [props.userStory]);
  const handleSave = async () => {
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
      console.log(error);
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
      handleSave={handleSave}
      handleCancel={handleCancel}
      userId={props.userId}
    />
  );
}
