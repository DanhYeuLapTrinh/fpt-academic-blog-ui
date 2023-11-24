import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import { timeConverter } from "../../../utils/StringMethod";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useHome from "../../../hooks/useHome";
import { Icon } from "@iconify/react";
export default function NotificationItem({ handleClose, notification }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setUnreadNotifications, notifications, setNotifications } = useHome();
  const readNotification = async () => {
    try {
      handleClose();
      await axiosPrivate.post(process.env.REACT_APP_READ_NOTIFICATION, {
        notificationId: notification?.notificationId,
      });
      setUnreadNotifications((prev) =>
        [...prev].filter(
          (item) => item?.notificationId !== notification?.notificationId
        )
      );
      let readNotification = notifications?.find(
        (item) => item?.notificationId === notification?.notificationId
      );
      readNotification.read = true;
      let newNotification = notifications?.filter(
        (item) => item?.notificationId !== notification?.notificationId
      );
      setNotifications([readNotification, ...newNotification]);
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  return (
    <Link
      to={
        notification?.content?.includes("từ chối")
          ? `/edit-draft/${notification?.relatedUrl}`
          : `/view/${notification?.relatedUrl}`
      }
      style={{ textDecoration: "none" }}
      onClick={readNotification}
    >
      <Stack
        sx={{ minWidth: "390px", p: "10px" }}
        direction={"row"}
        alignItems={"center"}
        spacing={"12px"}
        bgcolor={!notification?.read ? "secondary.alt" : "secondary.main"}
      >
        <Link
          to={
            !notification?.content?.includes("được duyệt") &&
            !notification?.content?.includes("từ chối") &&
            `/profile/${notification?.triggerUser}`
          }
        >
          <Stack
            direction={"row"}
            flex={1}
            alignItems={"center"}
            spacing={1}
            sx={{ position: "relative" }}
          >
            <UserProfile
              width="50px"
              height="50px"
              src={
                notification?.content?.includes("được duyệt") ||
                notification?.content?.includes("từ chối") ||
                notification?.content?.includes("xét thưởng")
                  ? null
                  : notification?.avatarOfTriggerUser
              }
            />
            {notification?.content?.includes("xét thưởng") && (
              <IconButton
                sx={{
                  bgcolor: "secondary.alt",
                  position: "absolute",
                  p: "5px",
                  bottom: -5,
                  right: -5,
                }}
              >
                <Icon
                  icon="material-symbols:rewarded-ads"
                  color="#5927e5"
                  width="17"
                />
              </IconButton>
            )}
            {notification?.content?.includes("trao thưởng") && (
              <IconButton
                sx={{
                  bgcolor: "secondary.alt",
                  position: "absolute",
                  p: "5px",
                  bottom: -5,
                  right: -5,
                }}
              >
                <Icon
                  icon="material-symbols:rewarded-ads"
                  color="#5927e5"
                  width="17"
                />
              </IconButton>
            )}
            {notification?.content?.includes("được duyệt") && (
              <IconButton
                sx={{
                  bgcolor: "secondary.alt",
                  position: "absolute",
                  p: "5px",
                  bottom: -5,
                  right: -5,
                }}
              >
                <Icon icon="mdi:check-bold" color="#5927e5" width="14" />
              </IconButton>
            )}
            {notification?.content?.includes("từ chối") && (
              <IconButton
                sx={{
                  bgcolor: "secondary.alt",
                  position: "absolute",
                  p: "5px",
                  bottom: -5,
                  right: -5,
                }}
              >
                <Icon icon="ph:x-fill" color="red" width="16" />
              </IconButton>
            )}
            {!notification?.content?.includes("từ chối") &&
              !notification?.content?.includes("được duyệt") &&
              !notification?.content?.includes("xét thưởng") &&
              !notification?.content?.includes("trao thưởng") && (
                <IconButton
                  sx={{
                    bgcolor: "secondary.alt",
                    position: "absolute",
                    p: "5px",
                    bottom: -5,
                    right: -5,
                  }}
                >
                  <Icon icon="majesticons:comment" color="#5927e5" width="14" />
                </IconButton>
              )}
          </Stack>
        </Link>
        <Stack justifyContent={"space-evenly"} height={"64px"} flex={10}>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="15px" fontWeight="400" lineHeight="20px">
              <span style={{ fontWeight: "500" }}>
                {notification?.content?.includes("được duyệt") ||
                notification?.content?.includes("từ chối")
                  ? ""
                  : notification?.fullNameOfTriggerUser}
              </span>{" "}
              {notification?.content}
            </Text>
          </Wrapper>
          <Text fontSize="11px" fontWeight="400">
            {timeConverter(notification?.notifyTime)}
          </Text>
        </Stack>
      </Stack>
    </Link>
  );
}
