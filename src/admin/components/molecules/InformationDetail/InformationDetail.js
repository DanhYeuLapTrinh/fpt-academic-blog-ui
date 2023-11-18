import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

function InformationDetailChildren({
  open,
  handleSkillOpen,
  handleSkillClose,
  renderSelectedSkills,
  renderDialogSkills,
}) {
  return (
    <>
      <Typography variant="h6" mt={4}>
        Kỹ năng
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: "1rem",
          border: "1px solid #ccc",
          mt: 0.5,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {renderSelectedSkills()}
        </Box>

        <IconButton
          onClick={handleSkillOpen}
          sx={{
            color: "#fff",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        >
          <AddIcon />
        </IconButton>

        <Dialog
          open={open}
          onClose={handleSkillClose}
          sx={{
            "& .MuiDialog-paper": {
              p: 2,
              maxWidth: "xs",
            },
          }}
        >
          <DialogTitle>Chọn kỹ năng</DialogTitle>
          <DialogContent>{renderDialogSkills()}</DialogContent>
          <DialogActions>
            <Button onClick={handleSkillClose}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

export default InformationDetailChildren;
