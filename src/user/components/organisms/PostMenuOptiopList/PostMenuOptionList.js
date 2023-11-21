import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
import { Link, useNavigate } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import ViewAPost from "../../pages/ViewAPost/ViewAPost/ViewAPost";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

export default function PostMenuOptionList({
  postDetail,
  toggleComment,
  hasPermission,
  setHasPermisson,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { historyDetail } = usePost();
  const { isAuthor } = usePost();
  const auth = useAuth();
  const handleClickDelete = () => {
    setIsDelete(true);
  };
  const handleCloseDelete = () => {
    setIsDelete(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const giveReward = async () => {
    try {
      if (hasPermission) {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_GIVE_REWARD,
          {
            postId: postDetail?.postId,
          }
        );
        if (response) {
          setHasPermisson(false);
          props.handleClose();
        }
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        disabled={historyDetail?.length === 0 || !props.isEdited}
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <Icon icon="ph:eye-bold" color="#444746" width="24" />
        </ListItemIcon>
        <Text fontSize="14px">Xem lịch sử chỉnh sửa</Text>
      </MenuItem>
      <Dialog open={open} maxWidth="lg">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ p: "14px" }}
        >
          <Box />
          <Text fontSize="20px">Lịch sử chỉnh sửa</Text>
          <IconButton
            sx={{
              p: "8px",
            }}
            disableFocusRipple
            disableRipple
            disableTouchRipple
            onClick={handleCloseDialog}
          >
            <Icon icon="octicon:x-12" color="#444746 " width="20" />
          </IconButton>
        </Stack>
        <Divider orientation="horizontal" />
        <DialogContent
          sx={{
            p: "20px 0 0",
          }}
        >
          <ViewAPost previewHistory postDetail={historyDetail} />
        </DialogContent>
      </Dialog>
      {isAuthor && (
        <>
          <Link
            to={`/edit/${postDetail?.slug}`}
            style={{ textDecoration: "none" }}
          >
            <MenuItem onClick={handleClickOpen}>
              <ListItemIcon>
                <Icon icon="uil:edit" color="#444746" width="24" />
              </ListItemIcon>
              <Text fontSize="14px">Chỉnh sửa bài viết</Text>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleClickDelete}>
            <ListItemIcon>
              <Icon
                icon="ant-design:delete-outlined"
                color="#444746"
                width="24"
              />
            </ListItemIcon>
            <Text fontSize="14px">Xóa bài viết</Text>
          </MenuItem>
          <Dialog open={isDelete}>
            <DialogTitle id="alert-dialog-title">
              {"Bạn muốn xóa bài viết này?"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                <DialogContentText id="alert-dialog-description">
                  Bài viết này sẽ bị xóa và không hiển thị trên trang cá nhân
                  của bạn nữa
                </DialogContentText>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} variant="outlined">
                <Text fontSize="14px">Hủy</Text>
              </Button>
              <Button onClick={props.deletePost} autoFocus variant="contained">
                <Text color="secondary.main" fontSize="14px">
                  Tôi đã hiểu
                </Text>
              </Button>
            </DialogActions>
          </Dialog>
          {props.isAllowComment ? (
            <MenuItem onClick={toggleComment}>
              <ListItemIcon>
                <Icon
                  icon="mdi:comment-off-outline"
                  color="#444746"
                  width="24"
                />
              </ListItemIcon>
              <Text fontSize="14px">Tắt tính năng bình luận</Text>
            </MenuItem>
          ) : (
            <MenuItem onClick={toggleComment}>
              <ListItemIcon>
                <Icon icon="mdi:comment-outline" color="#444746" width="24" />
              </ListItemIcon>
              <Text fontSize="14px">Bật tính năng bình luận</Text>
            </MenuItem>
          )}
        </>
      )}
      {!isAuthor &&
        hasPermission &&
        auth?.role === "lecturer" &&
        postDetail?.tag?.tagName !== "Q&A" && (
          <MenuItem onClick={giveReward}>
            <ListItemIcon>
              <Icon
                icon="material-symbols:rewarded-ads-outline-rounded"
                color="#444746"
                width="24"
              />
            </ListItemIcon>
            <Text fontSize="14px">Trao thưởng bài viết</Text>
          </MenuItem>
        )}
    </Menu>
  );
}
