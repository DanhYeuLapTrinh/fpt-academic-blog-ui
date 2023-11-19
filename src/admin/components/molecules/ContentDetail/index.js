import {
  Box,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import HeaderContentDetail from "../HeaderContentDetail";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
import React from "react";

function BodyContent() {
  const { reportedProfile } = useReportedProfileContext();

  const postList = reportedProfile.postList.ApprovedPost || [];

  return (
    <Stack sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {postList.map((post) => (
        <Paper
          key={post.postId}
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(33, 43, 54)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            backgroundImage: "none",
            overflow: "hidden",
            position: "relative",
            boxShadow:
              "0px 0px 2px 0px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            borderRadius: "16px",
            zIndex: 0,
          }}
        >
          <HeaderContentDetail
            accountName={post.accountName}
            dateOfPost={post.dateOfPost}
            avatar={post.avatarURL}
          />
          <Typography
            sx={{
              margin: 0,
              lineHeight: 1.57143,
              fontSize: "0.875rem",
              fontFamily: "Public Sans, sans-serif",
              fontWeight: 400,
              paddingLeft: "24px",
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ padding: 2 }}>
            <ImageList
              sx={{
                overflow: "hidden",
                position: "relative",
                verticalAlign: "bottom",
                display: "inline-block",
                width: "100%",
                borderRadius: 5,
              }}
            >
              <ImageListItem
                sx={{
                  width: "100%",
                  height: "100%",
                  verticalAlign: "bottom",
                  paddingTop: "56,25%",
                  backgroundSize: "cover !important",
                }}
              >
                <img
                  className="MuiImageListItem-img"
                  alt="coverURL"
                  src={post.coverURL}
                />
              </ImageListItem>
            </ImageList>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}

export default BodyContent;
