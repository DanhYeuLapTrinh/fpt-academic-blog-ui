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
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function SearchPopper(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        color="primary"
        sx={{ m: "10px", position: "relative" }}
        onClick={handleClickOpen}
      >
        <TuneRoundedIcon />
      </IconButton>
      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="md"
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
                  />
                </Stack>
              </FormControl>
              <FormControl sx={{ minWidth: "100%" }}>
                <Stack direction={"row"} width={"100%"} alignItems={"center"}>
                  <Box flex={2}>
                    <Text>Chủ đề:</Text>
                  </Box>
                  <Stack
                    direction={"row"}
                    spacing={1}
                  >
                    <FormControl>
                      <Select
                        sx={{ height: "30px", pr: "5px" }}
                        IconComponent={KeyboardArrowDownIcon}
                        value={props.major ?? "Ngành"}
                        onChange={(e) => props.handleMajorChange(e)}
                      >
                        <MenuItem value="Ngành" disabled>
                          <Text fontSize="14px">Ngành</Text>
                        </MenuItem>
                        {props.data?.map((item) => (
                          <MenuItem key={item.id} value={item.categoryName}>
                            <Text fontSize="14px">{item.categoryName}</Text>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Select
                        sx={{ height: "30px", pr: "5px" }}
                        IconComponent={KeyboardArrowDownIcon}
                        value={props.semester ?? "Kỳ"}
                        onChange={(e) => props.handleSemesterChange(e)}
                        disabled={!props.major}
                      >
                        <MenuItem value="Kỳ" disabled>
                          <Text fontSize="14px">Kỳ</Text>
                        </MenuItem>
                        {props.data
                          ?.find((item) => item.categoryName === props.major)
                          ?.childCategories?.map((item) => (
                            <MenuItem key={item.id} value={item.categoryName}>
                              <Text fontSize="14px">{item.categoryName}</Text>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl error={props.subject === undefined && true}>
                      <Select
                        sx={{ height: "30px", pr: "5px" }}
                        IconComponent={KeyboardArrowDownIcon}
                        value={props.subject ?? "Môn"}
                        onChange={(e) => props.setSubject(e.target.value)}
                        disabled={!props.semester}
                      >
                        <MenuItem value="Môn" disabled>
                          <Text fontSize="14px">Môn</Text>
                        </MenuItem>
                        {props.data
                          ?.find((item) => item.categoryName === props.major)
                          ?.childCategories?.find(
                            (item) => item.categoryName === props.semester
                          )
                          ?.childCategories?.map((item) => (
                            <MenuItem
                              key={item.id}
                              value={item.categoryName}
                              onClick={() => props.setSubjectID(item.id)}
                            >
                              <Text fontSize="14px">{item.categoryName}</Text>
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <Select
                        sx={{ height: "30px", pr: "5px" }}
                        IconComponent={KeyboardArrowDownIcon}
                        value={props.tag ?? "Thẻ"}
                        onChange={(e) => props.setTag(e.target.value)}
                        disabled={!props.subject}
                      >
                        <MenuItem value="Thẻ" disabled>
                          <Text fontSize="14px">Thẻ</Text>
                        </MenuItem>
                        {props.tagList?.map((tag) => (
                          <MenuItem
                            key={tag.id}
                            value={tag.tagName}
                            onClick={() => props.setTagID(tag.id)}
                          >
                            <Text fontSize="14px">{tag.tagName}</Text>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </FormControl>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
