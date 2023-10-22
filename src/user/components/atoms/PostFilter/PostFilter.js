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
import Text from "../../atoms/Text/Text";
import { FormHelperText, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SelectOption from "../SelectOption/SelectOption";
export default function PostFilter() {
  const [major, setMajor] = useState("Ngành");
  const [majorID, setMajorID] = useState("");
  const [semester, setSemester] = useState("Kỳ");
  const [semesterID, setSemesterID] = useState("");
  const [subject, setSubject] = useState("Môn");
  const [subjectID, setSubjectID] = useState("");
  const [tag, setTag] = useState("Tag");
  const [tagID, setTagID] = useState("");

  const handleMajorChange = (e) => {
    setMajor(e.target.value)
    setSemester("Kỳ")
    setSemesterID("")
    setSubject("Môn")
    setSubjectID("")
    setTag("Tag")
    setTagID("")
  };

  return (
    <Stack direction={"row"} spacing={1}>
      <FormControl>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={major}
          onChange={(e) => handleMajorChange(e)}
        >
          <MenuItem value="Ngành" disabled>
            <Text fontSize="14px">Ngành</Text>
          </MenuItem>
          <MenuItem value={"Kỹ thuật phần mềm"} onClick={() => setMajorID("majorID")}>
            <Text fontSize="14px">Kỹ thuật phần mềm</Text>
          </MenuItem>
          <MenuItem value={"Major name 2"} onClick={() => setMajorID("majorID")}>
            <Text fontSize="14px">Thiết kế đồ họa</Text>
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl error={semester == "Kỳ" && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <MenuItem value="Kỳ" disabled>
            <Text fontSize="14px">Kỳ</Text>
          </MenuItem>
          <MenuItem
            value={"Semester name"}
            onClick={() => setSemesterID("semesterID")}
            
          >
            <Text fontSize="14px">Kỳ 1</Text>
          </MenuItem>
        </Select>
        {semester == "Kỳ" && <FormHelperText>Trống</FormHelperText>}
      </FormControl>
      <FormControl error={subject == "Môn" && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <MenuItem value="Môn" disabled>
            <Text fontSize="14px">Môn</Text>
          </MenuItem>
          <MenuItem value={"Subject name"} onClick={() => setSubjectID("subID")}>
            <Text fontSize="14px">SWP391</Text>
          </MenuItem>
        </Select>
        {subject == "Môn" && <FormHelperText>Trống</FormHelperText>}
      </FormControl>
      <FormControl error={tag == "Tag" && true}>
        <Select
          sx={{ height: "30px", pr: "5px" }}
          IconComponent={KeyboardArrowDownIcon}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <MenuItem value="Tag" disabled>
            <Text fontSize="14px">Tag</Text>
          </MenuItem>
          <MenuItem value={"Tag name"} onClick={() => setTagID("tagID")}>
            <Text fontSize="14px">Academic</Text>
          </MenuItem>
        </Select>
        {tag == "Tag" && <FormHelperText>Trống</FormHelperText>}
      </FormControl>
    </Stack>
  );
}
