import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Text from "../Text/Text";

export default function SelectOption(props) {
  const [option, setOption] = React.useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={option}
          onChange={handleChange}
          sx={{
            bgcolor: "primary.main",
          }}
        >
          <MenuItem sx={{ "&.MuiMenuItem-root": { color: "white" } }} value="">
            {props.label}
          </MenuItem>
          <MenuItem
            value={props.item}
            sx={{ "&.MuiMenuItem-root": { color: "white" } }}
          >
            {props.item}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
