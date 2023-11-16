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
import { Link } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import ViewAPost from "../../pages/ViewAPost/ViewAPost/ViewAPost";

export default function PostMenuOptionList(props) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { historyDetail } = usePost();
  const { isAuthor } = usePost();
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
      <MenuItem disabled={!props.isEdited} onClick={handleClickOpen}>
        <ListItemIcon>
          <Icon icon="ph:eye-bold" color="#444746" width="24" />
        </ListItemIcon>
        <Text fontSize="14px">Xem lịch sử chỉnh sửa</Text>
      </MenuItem>
      <Box sx={{ position: "relative" }}>
        <Dialog open={open} maxWidth="lg">
          <DialogContent sx={{ p: 5 }}>
            <ViewAPost previewHistory data={historyDetail}/>
          </DialogContent>
          <DialogActions sx={{ position: "absolute", right: 20, top: 20 }}>
            <IconButton
              sx={{ p: 0 }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={handleCloseDialog}
            >
              <Icon icon="uil:x" color="#444746" width="24" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Box>
      {isAuthor && (
        <>
          <Link
            to={`/edit/${props.data.slug}`}
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
          <Dialog
            open={isDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
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
          {props.allowComment ? (
            <MenuItem>
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
            <MenuItem>
              <ListItemIcon>
                <Icon icon="mdi:comment-outline" color="#444746" width="24" />
              </ListItemIcon>
              <Text fontSize="14px">Bật tính năng bình luận</Text>
            </MenuItem>
          )}
        </>
      )}
    </Menu>
  );
}
