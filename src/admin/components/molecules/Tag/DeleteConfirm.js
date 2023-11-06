import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

function DeleteConfirm({ open, handleClose, deleteTag, data }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Bạn có chắc chắn xóa "${data}" không?`}</DialogTitle>
      <DialogActions style={{ marginTop: "10px" }}>
        <Button onClick={handleClose}>Không</Button>
        <Button
          sx={{
            bgcolor: "red",
            height: "30px",
            width: "20px",
            color: "white",
            borderRadius: "5px",
            "&:hover": {
              bgcolor: "red",
              transform: "scale(1.1)",
            },
            
          }}
          onClick={deleteTag}
        >
          Có
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirm;
