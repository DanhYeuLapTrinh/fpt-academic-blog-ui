import React from "react";
import Modal from "react-modal";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const MuteModal = ({
  isOpen,
  onRequestClose,
  muteDuration,
  onMuteDurationChange,
  onMuteUser,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          maxWidth: "400px",
          margin: "auto",
          maxHeight: "200px",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          background: "#fff",
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
          }}
        >
          Nhập thời gian hạn chế (giờ)
        </Typography>
        <Box>
          <Grid
            container
            item
            direction="row"
            spacing={2}
            sx={{ marginTop: "20px" }}
          >
            <Grid item xs={8}>
              <TextField
                type="number"
                value={muteDuration}
                onChange={(e) => onMuteDurationChange(e.target.value)}
                variant="outlined"
                fullWidth
                inputProps={{
                  style: {
                    height: "100%",
                    borderRadius: "20px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={onMuteUser}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "20px",
                  width: "100%",
                  height: "100%",
                }}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  );
};

export default MuteModal;
