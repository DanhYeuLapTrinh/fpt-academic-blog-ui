import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import Text from "../../atoms/Text/Text";
import React from "react";
import { Link } from "react-router-dom";

export default function IconMenuOption(props) {
  return (
    <Link to={props.path}>
      <MenuItem sx={{ p: "10px" }} onClick={props.onClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>
          <Text color={props.color} fontSize="13px">
            {props.label}
          </Text>
        </ListItemText>
        <Typography variant="body2" color="text.main">
          {props.shortcut}
        </Typography>
      </MenuItem>
    </Link>
  );
}
