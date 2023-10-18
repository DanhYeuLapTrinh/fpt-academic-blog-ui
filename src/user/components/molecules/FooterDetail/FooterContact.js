import React from "react";
import Text from "../../atoms/Text/Text";
import { IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function FooterContact() {
  return (
    <div>
      <Text>Theo dõi chúng tôi</Text>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={"3px"}>
        <IconButton sx={{ p: 0 }}>
          <FacebookIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <Text fontWeight="400" fontSize="13px">
          Facebook
        </Text>
      </Stack>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={"3px"}>
        <IconButton sx={{ p: 0 }}>
          <YouTubeIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <Text fontWeight="400" fontSize="13px">
          YouTube
        </Text>
      </Stack>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={"3px"}>
        <IconButton sx={{ p: 0 }}>
          <GitHubIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <Text fontWeight="400" fontSize="13px">
          GitHub
        </Text>
      </Stack>
      <Stack direction={"row"} alignItems={"flex-end"} spacing={"3px"}>
        <IconButton sx={{ p: 0 }}>
          <TwitterIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <Text fontWeight="400" fontSize="13px">
          Twitter
        </Text>
      </Stack>
    </div>
  );
}
