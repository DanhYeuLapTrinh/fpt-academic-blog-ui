import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function FilterRole({ filterRole, handleChangeSetRole }) {
  return (
    <Grid item xs={2}>
      <FormControl
        variant="outlined"
        sx={{ display: "flex", flex: 1, padding: 1.5 }}
      >
        <InputLabel id="role-label" sx={{ mt: 1.8, ml: 1, fontSize: 13 }}>
          Vai trò
        </InputLabel>
        <Select
          labelId="role-label"
          id="role-select"
          value={filterRole}
          onChange={handleChangeSetRole}
          label="Role"
        >
          <MenuItem value="">Chọn vai trò</MenuItem>
          <MenuItem value="lecturer">Lecturer</MenuItem>
          <MenuItem value="mentor">Mentor</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

export default FilterRole;
