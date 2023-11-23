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
    getNotifications();
    setUserAvatar();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
                <Icon icon="el:inbox-box" color="#c3c3c3" width="50" />
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
                <Icon icon="el:inbox-box" color="#c3c3c3" width="50" />
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
