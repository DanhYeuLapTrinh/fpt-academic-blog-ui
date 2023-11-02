import React from "react";
import { Modal, Typography, Grid, TextField, Button } from "@mui/material";

function MuteModal({
  isOpen,
  onRequestClose,
  muteDuration,
  setMuteDuration,
  muteUser,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          maxWidth: "400px",
          margin: "auto",
          maxHeight: "200px",
        },
      }}
    >
      <Grid container direction="column" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Nhập thời gian hạn chế (giờ)
        </Typography>
        <Grid container item direction="row" spacing={2}>
          <Grid item xs={8}>
            <TextField
              type="number"
              value={muteDuration}
              onChange={(e) => setMuteDuration(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={muteUser} variant="contained" color="primary">
              OK
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default MuteModal;
