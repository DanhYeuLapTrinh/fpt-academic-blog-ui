import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DismissDialog({
  open,
  onDismiss,
  onCancel,
  title,
  content,
}) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            bgcolor: "red",
            borderRadius: "2rem",
            height: "2rem",
            width: "6rem",
            color: "white",
            "&:hover": {
              bgcolor: "red",
            },
          }}
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          sx={{
            bgcolor: "#34D399",
            borderRadius: "2rem",
            height: "2rem",
            width: "6rem",
            color: "white",
            "&:hover": {
              bgcolor: "#34D399",
              opacity: 1,
            },
          }}
          onClick={onDismiss}
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}
