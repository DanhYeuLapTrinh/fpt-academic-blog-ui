import React from "react";
import NavOption from "../../atoms/NavOption/NavOption";
import { Divider, List, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function NavList({ options }) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <Text fontFamily="Klavika" color="primary.main" fontSize="42px">
        fblog
      </Text>
      <Divider orientation="vertical" sx={{ height: "25px" }} />
      <List>
        <Stack direction={"row"} spacing={1}>
          {options.map((item, index) => (
            <NavOption key={index}>{item.text}</NavOption>
          ))}
        </Stack>
      </List>
    </Stack>
  );
}
