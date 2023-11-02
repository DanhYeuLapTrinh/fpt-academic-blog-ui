import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteSubjectPopup({
  open,
  handleDeleteSubject,
  closeDeleteSubjectModal,
}) {
  return (
    <Dialog open={open} onClose={closeDeleteSubjectModal}>
      <DialogTitle>Bạn có chắc chắn muốn xóa môn học này?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Thao tác này sẽ xóa môn học và không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteSubjectModal} color="primary">
          Hủy
        </Button>
        <Button onClick={handleDeleteSubject} color="primary">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSubjectPopup;
