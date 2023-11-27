import React, { useEffect, useState } from "react";
import UserTab from "../UserTab/UserTab";
import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link, useNavigate } from "react-router-dom";
import NavList from "../../molecules/Navigation/NavList";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import useWebSocket from "react-use-websocket";
import Menu from "@mui/material/Menu";
import useHome from "../../../hooks/useHome";
import NotificationItem from "../NotificationItem/NotificationItem";
import { Icon } from "@iconify/react";
import useHomeAPI from "../../pages/Home";

export default function Header() {
  const {
    notifications,
    setNotifications,
    unreadNotifications,
    setUnreadNotifications,
  } = useHome();
  const { getNotifications, setUserAvatar } = useHomeAPI();
  const [filter, setFilter] = useState("Tất cả");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const navigate = useNavigate();

  useWebSocket(process.env.REACT_APP_WEBSOCKET_URL + auth.id, {
    onMessage: (newNotification) => {
      let updated = [...notifications, JSON.parse(newNotification?.data)].sort(
        (a, b) =>
          new Date(b.notifyTime).getTime() - new Date(a.notifyTime).getTime()
      );
      let unreadNotifications = updated?.filter((item) => item?.read === false);
      setUnreadNotifications(unreadNotifications);
      setNotifications(updated);
    },
    shouldReconnect: () => true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        await setUserAvatar();
        await getNotifications();
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);
  const handleClick = (event) => {
    try {
      getNotifications();
      setAnchorEl(event.currentTarget);
    } catch (error) {}
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ padding: "15px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Text fontFamily="Klavika" color="primary.main" fontSize="42px">
              fblog
            </Text>
          </Link>
          <Divider orientation="vertical" sx={{ height: "25px" }} />
          <NavList />
        </Stack>
        <UserTab handleClick={handleClick} />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "auto",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              borderRadius: "10px",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 13,
                width: 20,
                height: 20,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Stack
            p={"6px 14px 8px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="18px">Thông báo</Text>
            <Stack direction={"row"} spacing={1} p="1 0">
              <IconButton
                sx={{ p: 0 }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                <Text fontSize="14px">
                  <Chip
                    label={
                      <Text
                        color={filter === "Tất cả" ? "secondary.main" : ""}
                        fontSize="12px"
                      >
                        Tất cả
                      </Text>
                    }
                    sx={{
                      borderRadius: "10px",
                      bgcolor: filter === "Tất cả" ? "primary.main" : "",
                    }}
                    size="small"
                    onClick={() => setFilter("Tất cả")}
                  />
                </Text>
              </IconButton>
              <IconButton
                sx={{ p: 0 }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                <Text fontSize="14px">
                  <Chip
                    label={
                      <Text
                        color={filter === "Chưa đọc" ? "secondary.main" : ""}
                        fontSize="12px"
                      >
                        Chưa đọc
                      </Text>
                    }
                    sx={{
                      borderRadius: "10px",
                      bgcolor: filter === "Chưa đọc" ? "primary.main" : "",
                    }}
                    size="small"
                    onClick={() => setFilter("Chưa đọc")}
                  />
                </Text>
              </IconButton>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack
            sx={{
              width: "400px",
              minHeight: "300px",
            }}
          >
            {notifications?.length === 0 && filter === "Tất cả" && (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
                spacing={1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="50px"
                  viewBox="0 0 512 512"
                  fill="#c3c3c3"
                >
                  <path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z" />
                </svg>
                <Text color="lightText.main" fontWeight="400" fontSize="14px">
                  Chưa có thông báo mới
                </Text>
              </Stack>
            )}
            {unreadNotifications?.length === 0 && filter === "Chưa đọc" && (
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
                spacing={1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="50px"
                  viewBox="0 0 512 512"
                  fill="#c3c3c3"
                >
                  <path d="M121 32C91.6 32 66 52 58.9 80.5L1.9 308.4C.6 313.5 0 318.7 0 323.9V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V323.9c0-5.2-.6-10.4-1.9-15.5l-57-227.9C446 52 420.4 32 391 32H121zm0 64H391l48 192H387.8c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7H195.8c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7H73L121 96z" />
                </svg>
                <Text color="lightText.main" fontWeight="400" fontSize="14px">
                  Bạn đã đọc hết thông báo
                </Text>
              </Stack>
            )}
            {filter === "Tất cả" &&
              notifications?.map((item) => (
                <NotificationItem
                  notification={item}
                  handleClose={handleClose}
                />
              ))}
            {filter === "Chưa đọc" &&
              unreadNotifications?.map((item) => (
                <NotificationItem
                  notification={item}
                  handleClose={handleClose}
                />
              ))}
          </Stack>
        </Menu>
      </Stack>
    </Container>
  );
}
