import {
  Box,
  Button,
  Container,
  Divider,
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
import { Icon } from "@iconify/react";

export default function EditProfile({
  profile,
  updatedEmail,
  setUpdatedEmail,
  updatedName,
  setUpdatedName,
  newPassword,
  setNewPassword,
  oldPassword,
  setOldPassword,
  changePassword,
  isSelected,
  setIsSelected,
  changeUserInfo,
  changeUserEmail,
  confirmNewPassword,
  setConfirmNewPassword,
}) {
  const { avatarURL } = useProfile();
  return (
    <Container sx={{ mt: "37px", minHeight: "calc(100vh - 93px - 37px)" }}>
      <Paper sx={{ p: "20px 30px", minHeight: "300px" }}>
        <Stack direction={"row"} spacing={6} height={"100%"}>
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
          <Stack sx={{ width: "80%", height: "100%" }} spacing={1}>
            <Text fontSize="28px" fontWeight="400">
              Chỉnh sửa tài khoản
            </Text>
            <Stack direction={"row"} spacing={"12px"} pb={"10px"}>
              <Button
                variant={
                  isSelected === "Thông tin hiển thị" ? "contained" : "outlined"
                }
                sx={{ textTransform: "none", borderRadius: "10px" }}
                onClick={() => setIsSelected("Thông tin hiển thị")}
              >
                <Text
                  color={
                    isSelected === "Thông tin hiển thị"
                      ? "secondary.main"
                      : "primary.main"
                  }
                  fontSize="14px"
                >
                  Thông tin hiển thị
                </Text>
              </Button>
              <Button
                variant={
                  isSelected === "Chi tiết liên lạc" ? "contained" : "outlined"
                }
                sx={{ textTransform: "none", borderRadius: "10px" }}
                onClick={() => setIsSelected("Chi tiết liên lạc")}
              >
                <Text
                  color={
                    isSelected === "Chi tiết liên lạc"
                      ? "secondary.main"
                      : "primary.main"
                  }
                  fontSize="14px"
                >
                  Chi tiết liên lạc
                </Text>
              </Button>
              <Button
                variant={isSelected === "Mật khẩu" ? "contained" : "outlined"}
                sx={{ textTransform: "none", borderRadius: "10px" }}
                onClick={() => setIsSelected("Mật khẩu")}
              >
                <Text
                  color={
                    isSelected === "Mật khẩu"
                      ? "secondary.main"
                      : "primary.main"
                  }
                  fontSize="14px"
                >
                  Mật khẩu
                </Text>
              </Button>
            </Stack>
            {isSelected === "Thông tin hiển thị" && (
              <Stack
                sx={{ p: "25px", borderRadius: "10px" }}
                bgcolor={"secondary.alt"}
                minHeight={"100px"}
                spacing={2}
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box width={"25%"}>
                    <Text>Tên hiển thị:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Button
                  sx={{ alignSelf: "flex-end", textTransform: "none" }}
                  variant="contained"
                  disabled={!updatedName}
                  onClick={() => changeUserInfo()}
                >
                  Lưu thay đổi
                </Button>
              </Stack>
            )}
            {isSelected === "Chi tiết liên lạc" && (
              <Stack
                sx={{ p: "25px", borderRadius: "10px" }}
                bgcolor={"secondary.alt"}
                minHeight={"100px"}
                spacing={2}
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box width={"25%"}>
                    <Text>Email:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={updatedEmail}
                    disabled={updatedEmail === profile?.username}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box width={"25%"}>
                    <Text>Mật khẩu hiện tại:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    placeholder="Nhập mật khẩu để xác nhận địa chỉ email mới"
                    value={newPassword}
                    disabled={updatedEmail === profile?.username}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Button
                  sx={{ alignSelf: "flex-end", textTransform: "none" }}
                  variant="contained"
                  disabled={!updatedName || !newPassword}
                  onClick={() => changeUserEmail()}
                >
                  Lưu thay đổi
                </Button>
              </Stack>
            )}
            {isSelected === "Mật khẩu" && (
              <Stack
                sx={{ p: "25px", borderRadius: "10px" }}
                bgcolor={"secondary.alt"}
                minHeight={"100px"}
                spacing={2}
              >
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box width={"25%"}>
                    <Text>Mật khẩu hiện tại:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Divider sx={{ paddingTop: "15px" }} />
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                  paddingTop={"15px"}
                >
                  <Box width={"25%"}>
                    <Text>Mật khẩu mới:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={1}
                  width={"100%"}
                  alignItems={"center"}
                >
                  <Box width={"25%"}>
                    <Text>Xác nhận khẩu mới:</Text>
                  </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    fullWidth
                  />
                </Stack>
                <Button
                  sx={{ alignSelf: "flex-end", textTransform: "none" }}
                  variant="contained"
                  disabled={!newPassword || !confirmNewPassword || !oldPassword}
                  onClick={() => changePassword()}
                >
                  Lưu thay đổi
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
