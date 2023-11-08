import React from "react";
import { Avatar, Box, Stack, Typography, Paper } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
function BodyDetail() {
  const { reportedProfiles } = useReportedProfileContext();

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
          backgroundSize: "cover",
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
            backgroundColor: "#fff",
          }}
        />
        <Stack
          sx={{
            bottom: 24,
            left: 24,
            zIndex: 10,
            position: "absolute",
            display: "flex",
          }}
        >
          <Avatar
            sx={{
              width: 124.8,
              height: 124.8,
            }}
            src="https://wallpapers.com/images/hd/aesthetic-anime-boy-icon-houtarou-oreki-sbrd8ilkz3vhk7na.jpg"
          />
        </Stack>
        <Stack
          sx={{
            marginLeft: 22,
            textAlign: "unset",
            position: "absolute",
            bottom: "55px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: 700,
              lineHeight: 1.5,
              margin: 0,
              display: "block",
            }}
          >
            {reportedProfiles[0].fullName}
          </Typography>
          <Typography
            sx={{
              margin: "4px 0px 0px",
              color: "inherit",
              display: "block",
              lineHeight: 1.57143,
              fontSize: "0.95rem",
              fontWeight: 400,
              fontFamily: "Public Sans, sans-serif",
              opacity: 0.48,
            }}
          >
            Data Analyst
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default BodyDetail;
