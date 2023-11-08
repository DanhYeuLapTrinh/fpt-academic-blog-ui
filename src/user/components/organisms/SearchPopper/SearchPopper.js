import React from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { IconButton, InputBase, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchPopper() {
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div style={{ position: "relative" }}>
          <IconButton
            color="primary"
            sx={{ m: "10px" }}
            {...bindToggle(popupState)}
          >
            <TuneRoundedIcon />
          </IconButton>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper
                  sx={{
                    position: "absolute",
                    right: -30,
                    top: 20,
                    width: "740px",
                    height: "auto",
                    p: 2,
                  }}
                >
                  <Stack spacing={2}>
                    <TextField placeholder="Enter name" fullWidth />
                    <TextField placeholder="Enter name" fullWidth />
                    <TextField placeholder="Enter name" fullWidth />
                    <Button variant="contained" sx={{ width: "100px" }}>
                      Tìm kiếm
                    </Button>
                  </Stack>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
