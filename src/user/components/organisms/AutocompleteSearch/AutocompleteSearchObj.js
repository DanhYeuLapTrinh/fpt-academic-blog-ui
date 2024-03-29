import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Text from "../../atoms/Text/Text";
import styles from "./Styles.module.scss";
export default function AutocompleteSearchObj({
  categoryList,
  setInputContent,
}) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Autocomplete
      multiple
      options={categoryList}
      disableCloseOnSelect
      fullWidth
      getOptionLabel={(option) => option.skillName}
      renderOption={(props, option, { selected }) => (
        <Text {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <Text>{option.skillName}</Text>
        </Text>
      )}
      onChange={(event, value) => {
        setInputContent(value);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Nhập từ khóa để tìm kiếm..." />
      )}
    />
  );
}
