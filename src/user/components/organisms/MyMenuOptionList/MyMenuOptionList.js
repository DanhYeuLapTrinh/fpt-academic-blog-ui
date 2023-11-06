import {ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
export default function MyMenuOptionList(props) {
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
        <MenuItem>
          <ListItemIcon>
          <Icon icon="ic:baseline-report-gmailerrorred" color="#444746" width="22" />
          </ListItemIcon>
          <Text fontSize="13px">Báo cáo hồ sơ</Text>
        </MenuItem>
      </Menu>
  );
}
