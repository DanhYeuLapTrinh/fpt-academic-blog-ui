import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DeleteSpecPopup({ open, handleDeleteCategory, closeDeleteModal }) {
  return (
    <Dialog open={open} onClose={closeDeleteModal}>
      <DialogTitle>Bạn có chắc chắn xóa chuyên ngành này?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Thao tác này sẽ xóa chuyên ngành và không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteModal} color="primary">
          Hủy
        </Button>
        <Button onClick={handleDeleteCategory} color="primary">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSpecPopup;
