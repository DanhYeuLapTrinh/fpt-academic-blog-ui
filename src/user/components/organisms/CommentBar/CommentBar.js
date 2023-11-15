import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function CommentBar({
  handleSubmit,
  handleEdit,
  initialText = "",
  ...props
}) {
  
  const [text, setText] = useState(initialText);
  const { setActiveComment } = usePost();
  const { avatarURL, setAvatarURL } = useProfile();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate()
  const onSubmit = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(e);
      !props.reply && setText("");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let profileInfo = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: auth.id,
          }
        );
        if(profileInfo) {
          setAvatarURL(profileInfo?.data?.profileUrl)
        }
      } catch (error) {}
    };
    fetchData();
  }, [avatarURL]);
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        bgcolor: props.reply || props.edit ? "" : "secondary.alt",
        p: props.edit ? "" : 2,
        borderRadius: "0 0 10px 10px",
        pl: props.reply && "55px",
      }}
    >
      <Stack direction={"row"} alignItems={"flex-start"} spacing={2}>
        {!props.edit && (
          <Link to={`/profile/${auth.id}`} style={{ textDecoration: "none" }}>
            <UserProfile
              width={props.avatarWidth ? props.avatarWidth : "42px"}
              height={props.avatarHeight ? props.avatarHeight : "42px"}
              src={avatarURL}
              alt="User"
            />
          </Link>
        )}
        <TextField
          variant="outlined"
          placeholder="Viết bình luận..."
          size="small"
          fullWidth
          multiline
          value={text}
          autoFocus={props.autoFocus}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={onSubmit}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
            }
          }}
          InputProps={{
            sx: {
              fontSize: "16px",
              fontWeight: "500",
              color: "text.main",
              borderRadius: "10px",
            },
          }}
        />
      </Stack>
      {props.hasCancelButton && (
        <Stack direction={"row"} spacing={2} alignSelf={"flex-end"}>
          <Button
            variant="outlined"
            sx={{ width: "100px" }}
            onClick={() => setActiveComment(null)}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100px" }}
            onClick={() => handleEdit(text)}
          >
            Lưu
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
