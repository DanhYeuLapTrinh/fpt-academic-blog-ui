import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import { Icon } from "@iconify/react";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";

export default function CommentMenuOptionList({ comment, ...props }) {
  const auth = useAuth();
  const {setActiveComment} = usePost()
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
            mr: 1,
            mt: 2,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "top", vertical: "center" }}
      >
        {comment.userId !== auth.id && (
          <MenuItem onClick={props.handleClickOpen}>
            <ListItemIcon>
              <Icon
                icon="ic:baseline-report-gmailerrorred"
                color="#444746"
                width="22"
              />
            </ListItemIcon>
            <Text fontSize="13px">Báo cáo bình luận</Text>
          </MenuItem>
        )}
        {comment.userId === auth.id && (
          <>
            <MenuItem onClick={() => setActiveComment({ id: comment.commentId, type: "edit" })}>
              <ListItemIcon>
                <Icon
                  icon="ic:baseline-report-gmailerrorred"
                  color="#444746"
                  width="22"
                />
              </ListItemIcon>
              <Text fontSize="13px">Chỉnh sửa bình luận</Text>
            </MenuItem>
            <MenuItem onClick={() => props.deleteComment(comment.commentId)}>
              <ListItemIcon>
                <Icon
                  icon="ant-design:delete-outlined"
                  color="#444746"
                  width="22"
                />
              </ListItemIcon>
              <Text fontSize="13px">Xóa bình luận</Text>
            </MenuItem>
          </>
        )}
      </Menu>
      <Dialog open={props.openReport} onClose={props.handleClose}>
        <DialogTitle>Báo cáo bình luận này?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nếu bạn nhận thấy có điều bất thường về bình luận này, đừng chần chừ
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
          <Button onClick={props.reportComment}>Báo cáo</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
