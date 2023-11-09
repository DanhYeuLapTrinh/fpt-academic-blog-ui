import {
  Chip,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Text from "../../atoms/Text/Text";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function MyMenuOptionList(props) {
  return (
    <>
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
        <MenuItem onClick={props.handleClickOpen}>
          <ListItemIcon>
            <Icon
              icon="ic:baseline-report-gmailerrorred"
              color="#444746"
              width="22"
            />
          </ListItemIcon>
          <Text fontSize="13px">Báo cáo hồ sơ</Text>
        </MenuItem>
      </Menu>
      <Dialog open={props.openReport} onClose={props.handleClose}>
        <DialogTitle>Báo cáo tài khoản này?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nếu bạn nhận thấy có điều bất thường về tài khoản này, đừng chần chừ
            mà hãy báo cáo ngay với chúng tôi nhé.
          </DialogContentText>
          <Stack
            direction={"row"}
            spacing={1}
            paddingTop={2}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {props?.reportReasons?.map((item, index) => (
              <Chip
                label={
                  <Text
                    fontSize="14px"
                    color={props.reportId === item.id ? "secondary.main" : ""}
                  >
                    {item.reasonName}
                  </Text>
                }
                key={index}
                onClick={() => props.setReportId(item.id)}
                sx={{
                  bgcolor: props.reportId === item.id ? "primary.main" : "#fff",
                  "&:hover": {
                    bgcolor:
                      props.reportId === item.id ? "primary.main" : "#e0e0e0",
                  },
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseReport}>Hủy</Button>
          <Button onClick={props.reportProfile}>Báo cáo</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
