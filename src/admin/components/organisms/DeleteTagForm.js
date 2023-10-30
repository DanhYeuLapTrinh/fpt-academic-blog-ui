import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function DeleteTagForm({
  open,
  handleClose,
  handleAddTag,
  errorMessage,
  data,
  newTagName,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Thêm thẻ mới</DialogTitle>
      <DialogContent sx={{ paddingBottom: "5px" }}>
        <TextField
          margin="dense"
          label="Tên thẻ mới"
          type="text"
          name="tagName"
          fullWidth
          variant="standard"
          value={newTagName}
          onChange={data}
        />
        <p style={{ color: "red" }}>{errorMessage}</p>
      </DialogContent>
      <DialogActions sx={{ marginTop: "10px" }}>
        <Button
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          sx={{
            fontSize: "10px",
            bgcolor: "green",
            height: "30px",
            width: "40px",
            color: "white",
            borderRadius: "5px",
            "&:hover": { bgcolor: "green" },
          }}
          onClick={handleAddTag}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTagForm;
