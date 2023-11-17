import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";

function AddSkillForm({
  open,
  handleClose,
  handleAddSkill,
  errorMessage,
  skillsData,
  newSkillName,
}) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Nếu F5 thì dữ liệu đang nhập sẽ mất";
      event.returnValue = message;
      return message;
    };

    if (open) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [open]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Thêm kỹ năng mới</DialogTitle>
      <DialogContent sx={{ paddingBottom: "5px" }}>
        <TextField
          margin="dense"
          label="Tên kỹ năng mới"
          type="text"
          name="skillName"
          fullWidth
          variant="outlined"
          value={newSkillName}
          onChange={skillsData}
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
          onClick={handleAddSkill}
        >
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSkillForm;
