import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import UserMenuOption from "../../molecules/UserMenuOption/UserMenuOption";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";

export default function PostMenuOptionList(props) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
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
          <MenuItem>
            <ListItemIcon>
              <Icon icon="uil:edit" color="#444746" width="24" />
            </ListItemIcon>
            <Text fontSize="14px">Chỉnh sửa bài viết</Text>
          </MenuItem>
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
