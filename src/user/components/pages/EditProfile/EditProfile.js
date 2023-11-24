import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import UploadCoverIcon from "../../organisms/UploadImageIcon/UploadCoverIcon";
import UploadImageIcon from "../../organisms/UploadImageIcon/UploadImageIcon";
import useProfile from "../../../hooks/useProfile";

export default function EditProfile({ profile, updatedName }) {
  const { avatarURL, profileCoverURL } = useProfile();
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px - 37px)" }}>
      <Paper sx={{ p: "20px 30px" }}>
        <Stack direction={"row"} spacing={6}>
          <Box
            sx={{
              width: "150px",
              height: "150px",
              backgroundImage: `url(${avatarURL})`,
              bgcolor: "white",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              border: "3px solid white",
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Tooltip title="Đổi ảnh đại diện" placement="right">
              <IconButton
                disableFocusRipple
                disableTouchRipple
                disableRipple
                sx={{
                  position: "absolute",
                  bottom: "-10px",
                  right: "5px",
                }}
              >
                <UploadImageIcon bottom="-5px" right="16px" />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack sx={{ width: "80%" }}>
            <Text fontSize="28px" fontWeight="400" mb="20px">
              Chỉnh sửa tài khoản
            </Text>
            <Stack width={"100%"} direction={"row"} spacing={2}>
              <Stack width={"50%"} spacing={"4px"}>
                <Text>Tên hiển thị:</Text>
                <TextField
                  variant="outlined"
                  size="small"
                  value={updatedName}
                  fullWidth
                />
              </Stack>
              <Stack width={"50%"} spacing={"4px"}>
                <Text>Email:</Text>
                <TextField
                  variant="outlined"
                  size="small"
                  value={profile?.email}
                  disabled={profile?.email === profile?.username}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
