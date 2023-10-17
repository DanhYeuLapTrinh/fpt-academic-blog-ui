import { Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import SeeAllButton from "../../atoms/SeeAllButton/SeeAllButton";

export default function SectionTitle(props) {
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "20px",
      }}
    >
      <Text fontSize="28px">{props.title}</Text>
      <SeeAllButton />
    </Stack>
  );
}
