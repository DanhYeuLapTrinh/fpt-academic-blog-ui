import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

function AddTagForm({
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
          variant="outlined"
          value={newTagName}
          onChange={data}
        />
        <p style={{ color: "red" }}>{errorMessage}</p>
      </DialogContent>
      <DialogActions sx={{ marginTop: "10px" }}>
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
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onClick={handleClose}
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
          onClick={handleAddTag}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTagForm;
