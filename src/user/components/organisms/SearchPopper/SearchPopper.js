import React, { useState } from "react";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Text from "../../atoms/Text/Text";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  FormControl,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import AutocompleteSearch from "../AutocompleteSearch/AutocompleteSearch";

export default function SearchPopper({
  categoryList,
  setInputContent,
  handleSearch,
  open,
  handleClickOpen,
  handleClose,
  setInputTitle,
  inputTitle
}) {
  return (
    <div>
      <IconButton color="primary" sx={{ m: "10px" }} onClick={handleClickOpen}>
        <TuneRoundedIcon />
      </IconButton>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="md"
        sx={{ zIndex: 888 }}
      >
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "700px",
              m: "10px 0",
            }}
          >
            <Stack spacing={2} width={"100%"}>
              <FormControl sx={{ minWidth: "100%" }}>
                <Stack direction={"row"} width={"100%"} alignItems={"center"}>
                  <Box flex={2}>
                    <Text>Tiêu đề:</Text>
                  </Box>
                  <TextField
                    sx={{ flex: 10 }}
                    multiline
                    placeholder="Nhập cụm từ khớp với tiêu đề bài viết..."
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                  />
                </Stack>
              </FormControl>
              <FormControl sx={{ minWidth: "100%" }}>
                <Stack direction={"row"} width={"100%"} alignItems={"center"}>
                  <Box flex={2}>
                    <Text>Chủ đề:</Text>
                  </Box>
                  <Box flex={10} width={"100%"}>
                    <AutocompleteSearch
                      categoryList={categoryList}
                      setInputContent={setInputContent}
                    />
                  </Box>
                </Stack>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "0 20px 20px 0" }}>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button onClick={handleSearch} variant="contained">
            Tìm kiếm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
