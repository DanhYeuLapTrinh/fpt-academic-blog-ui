import React, { useEffect, useState } from "react";
import UserStory from "./UserStory";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useContent from "../../../hooks/useContent";

export default function UserStoryService(props) {
  const [userStory, setUserStory] = useState();
  const [editedStory, setEditedStory] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);
  const {charCount, setCharCount} = useContent();
  const axiosPrivate = useAxiosPrivate();
  const maxCharLimit = 100;
  useEffect(() => {
    setUserStory(props.userStory);
    setEditedStory(props.userStory);
    setCharCount(props?.userStory?.length);
  }, [props.userStory]);

  const handleInputChange = (event) => {
    setEditedStory(event.target.value);
    setCharCount(event.target.value.length);
  }


  const handleSave = async () => {
    if(charCount < maxCharLimit) {
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
