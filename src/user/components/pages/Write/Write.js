import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container } from "@mui/material";
import Text from "../../atoms/Text/Text"
export default function Write() {
  const [open, setOpen] = useState(false);
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const handleMajorChange = (e) => {
    setMajor(e.target.value);
    setSemester('');
    setSubject('');
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Container sx={{ p: 5 }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        <Text fontSize="12px"  color="primary.main">Phân loại</Text>
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Phân loại bài viết</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex",gap: '10px', flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel htmlFor="demo-dialog-native">Ngành</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={major}
                onChange={(e) => handleMajorChange(e)}
                input={<OutlinedInput label="Ngành" />}
              >
                <MenuItem value={"KTPM"}><Text color="middleText.main">KTPM</Text></MenuItem>
                <MenuItem value={"AI"}><Text color="middleText.main">AI</Text></MenuItem>
                <MenuItem value={"TKDH"}><Text color="middleText.main">TKDH</Text></MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-dialog-select-label">Kỳ</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={semester}
                onChange={(e) => handleSemesterChange(e)}
                input={<OutlinedInput label="Kỳ" />}
                disabled={!major}
              >
                <MenuItem value={1}><Text color="middleText.main">Kỳ 1</Text></MenuItem>
                <MenuItem value={2}><Text color="middleText.main">Kỳ 2</Text></MenuItem>
                <MenuItem value={3}><Text color="middleText.main">Kỳ 3</Text></MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 110 }}>
              <InputLabel id="demo-dialog-select-label">Môn</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                input={<OutlinedInput label="Môn" />}
                disabled={!semester}
              >
                <MenuItem value={"SWP391"}><Text color="middleText.main">SWP391</Text></MenuItem>
                <MenuItem value={"SWT301"}><Text color="middleText.main">SWT301</Text></MenuItem>
                <MenuItem value={"FER201m"}><Text color="middleText.main">FER201m</Text></MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleClose}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
