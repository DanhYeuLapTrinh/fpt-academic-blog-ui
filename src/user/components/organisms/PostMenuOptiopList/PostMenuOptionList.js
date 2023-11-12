import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
import { Link, useParams } from "react-router-dom";

export default function PostMenuOptionList(props) {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { slug } = useParams();
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
    props.handleClose();
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
      <MenuItem disabled={!props.isEdited}>
        <ListItemIcon>
          <Icon icon="ph:eye-bold" color="#444746" width="24" />
        </ListItemIcon>
        <Text fontSize="14px">Xem lịch sử chỉnh sửa</Text>
      </MenuItem>
      {props.isAuthor && (
        <>
          <MenuItem onClick={handleClickOpen}>
            <ListItemIcon>
              <Icon icon="uil:edit" color="#444746" width="24" />
            </ListItemIcon>
            <Text fontSize="14px">Chỉnh sửa bài viết</Text>
          </MenuItem>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn muốn chỉnh sửa bài viết này?"}
            </DialogTitle>
            <DialogContent>
              <Stack spacing={1}>
                <DialogContentText id="alert-dialog-description">
                  Bài viết được chỉnh sửa và bài viết gốc sẽ là hai bài viết độc
                  lập, mọi phần thưởng (nếu có) ở bài viết gốc sẽ được giữ
                  nguyên.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  Tuy nhiên đối với bài viết được chỉnh sửa nếu có thay đổi quá
                  lớn so với bản gốc thì chúng tôi sẽ thông báo cho người kiểm
                  duyệt xem xét lại việc trao thưởng cho bài viết mới này.
                </DialogContentText>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined">
                <Text fontSize="14px">Hủy</Text>
              </Button>
              <Button onClick={handleCloseDialog} autoFocus variant="contained">
                <Link to={`/edit/${slug}`} style={{ textDecoration: "none" }}>
                  <Text color="secondary.main" fontSize="14px">
                    Tôi đã hiểu
                  </Text>
                </Link>
              </Button>
            </DialogActions>
          </Dialog>
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
