import { ListItemIcon, MenuItem } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function UserMenuOption(props) {
  return (
    <MenuItem
      sx={{ p: "10px 16px" }}
      onClick={props.handleClose ? props.handleClose : props.handleLogout}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <Text color={props.color} fontSize="14px">
        {props.label}
      </Text>
    </MenuItem>
  );
}
