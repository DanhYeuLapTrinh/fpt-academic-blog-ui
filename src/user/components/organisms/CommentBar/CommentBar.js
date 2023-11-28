import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export default function CommentBar({
  handleSubmit,
  handleEdit,
  initialText = "",
  postDetail,
  ...props
}) {
  const [text, setText] = useState(initialText);
  const { setActiveComment } = usePost();
  const { avatarURL } = useProfile();
  const auth = useAuth();
  const onSubmit = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && !props.edit) {
      if (e.target.value.trim().length > 300) {
        toast.error("Bình luận không được dài quá 300 kí tự");
        return;
      } else {
        handleSubmit(e);
        !props.reply && setText("");
      }
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        p: props.edit ? "" : "16px 0",
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
          disabled={!postDetail?.allowComment}
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
