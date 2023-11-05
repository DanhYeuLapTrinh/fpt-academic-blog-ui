import React from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from "@mui/material";
import { Icon } from '@iconify/react';
import Text from "../../atoms/Text/Text";
export default function LecturerMenu(props) {

  return (
    <Box sx={{width: "10px"}}>
    <IconButton onClick={props.handleClick}>
    <Icon icon="bi:three-dots" />
    </IconButton>
      <Menu
        anchorEl={props.anchorEl}
        id="account-menu"
        open={props.open}
        onClose={props.handleClose}
        onClick={props.handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            m: 1,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 18,
              left: 0,
              width: 10,
              height: 20,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={props.handleAction}>
          <Text fontSize="14px">{props.text}</Text>
        </MenuItem>
      </Menu>
    </Box>
   
  );
}
