import { Box, Stack, TextField } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";

export default function CommentBar({handleSubmit, ...props}) {
  const auth = useAuth();
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: props.reply ? "" : "secondary.alt",
        p: 2,
        borderRadius: "0 0 10px 10px",
        ml: props.reply && "55px"
      }}
    >
      <Stack direction={"row"} alignItems={"flex-start"} spacing={2}>
        <Link
          to={`/profile/${auth.id}`}
          style={{ textDecoration: "none" }}
        >
          <UserProfile
            width={props.avatarWidth ? props.avatarWidth : "42px"}
            height={props.avatarHeight ? props.avatarHeight : "42px"}
            src={auth.profileURL}
            alt="User"
          />
        </Link>
        <TextField
          variant="outlined"
          placeholder="Viết bình luận..."
          size="small"
          fullWidth
          multiline
          onKeyUp={(e) => handleSubmit(e)}
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
    </Box>
  );
}
