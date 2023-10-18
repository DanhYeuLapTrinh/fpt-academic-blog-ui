import React from "react";
import NavOption from "../../atoms/NavOption/NavOption";
import { Divider, List, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function NavList({ options }) {
  return (
    <List>
      <Stack direction={"row"} spacing={1}>
        {options.map((item, index) => (
          <NavOption key={index}>{item.text}</NavOption>
        ))}
      </Stack>
    </List>
  );
}
