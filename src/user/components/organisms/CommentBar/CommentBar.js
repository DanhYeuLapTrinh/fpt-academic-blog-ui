import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Link } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import { Editor } from "@tinymce/tinymce-react";

export default function CommentBar(props) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "secondary.alt",
        p: 2,
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Link
          to={`/profile/${props.profile}`}
          style={{ textDecoration: "none" }}
        >
          <UserProfile
            width={props.avatarWidth ? props.avatarWidth : "36px"}
            height={props.avatarHeight ? props.avatarHeight : "36px"}
            src={props.src}
            alt="User"
          />
        </Link>
        <TextField
          variant="outlined"
          placeholder="Viết bình luận..."
          size="small"
          fullWidth
          InputProps={{
            sx: {
              fontSize: "16px",
              fontWeight: "500",
              color: "text.main",
              borderRadius: "50px",
            },
            renderValue: (value) => (
              <Editor
                apiKey="or7ndgcoxdbx9821y1j3d8oi37nqe538m257uvlwroa11wiq"
                init={{ plugins: "image", toolbar: "image" }}
              />
            ),
          }}
        />
        
      </Stack>
    </Box>
  );
}
