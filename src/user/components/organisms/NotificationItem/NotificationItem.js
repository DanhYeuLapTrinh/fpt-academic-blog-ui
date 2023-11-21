import { Box, Stack } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import { timeConverter } from "../../../utils/StringMethod";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useHome from "../../../hooks/useHome";
export default function NotificationItem({ handleClose, notification }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setUnreadNotifications } = useHome();
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
      to={`/view/${notification?.relatedUrl}`}
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
        <Stack direction={"row"} flex={1} alignItems={"center"} spacing={1}>
          <UserProfile
            width="50px"
            height="50px"
            src={notification?.avatarOfTriggerUser}
          />
        </Stack>
        <Stack justifyContent={"space-evenly"} height={"64px"} flex={10}>
          <Wrapper WebkitLineClamp="2">
            <Text fontSize="15px" fontWeight="400" lineHeight="20px">
              <span style={{ fontWeight: "500" }}>
                {notification?.fullNameOfTriggerUser}
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
