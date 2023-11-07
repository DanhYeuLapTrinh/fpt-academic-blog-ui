import React from "react";
import {
  Avatar,
  Box,
  Stack,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function ReportedProfileDetail() {
  return (
    <Paper
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
        marginBottom: "24px",
        height: "290px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          color: "rgb(255, 255, 255)",
          background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <Tabs
          style={{
            overflow: "hidden",
            minHeight: "48px",
            display: "flex",
            width: "100%",
            bottom: "0px",
            position: "absolute",
            backgroundColor: "#ccc",
          }}
        />
        <Stack
          sx={{
            left: 24,
            bottom: 24,
            zIndex: 10,
            paddingTop: "0px",
            position: "absolute",
          }}
        >
          <Avatar
            sx={{
              width: 124.8,
              height: 124.8,
            }}
            src="/assets/img/blank.png"
          />
          <ListItemText sx={{ marginLeft: 24, textAlign: "unset" }}>
            <Typography sx={{ fontSize: "1.5rem" }}>Jackie Love</Typography>
            <Typography
              sx={{
                margin: "4px 0px 0px",
                color: "inherit",
                display: "block",
                lineHeight: 1.57143,
                fontSize: "0.875rem",
                fontWeight: 400,
                fontSize: "0.875rem",
                fontFamily: "Public Sans, sans-serif",
                opacity: 0.48,
              }}
            >
              Data Analyst
            </Typography>
          </ListItemText>
        </Stack>
      </Box>
    </Paper>
  );
}

export default ReportedProfileDetail;
