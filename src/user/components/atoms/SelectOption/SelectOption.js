import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Text from "../Text/Text";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SelectOption() {
  const [type, setType] = useState("Bài viết");
  return (
    <Select
      required
      value={type}
      onChange={(e) => setType(e.target.value)}
      sx={{ height: "30px"}}
      IconComponent={KeyboardArrowDownIcon}
    >
      <MenuItem value={"Bài viết"}>
        <Text fontSize="14px"></Text>
      </MenuItem>
      <MenuItem value={"Câu hỏi"}>
        <Text fontSize="14px">Câu hỏi</Text>
      </MenuItem>
    </Select>
  );
}
