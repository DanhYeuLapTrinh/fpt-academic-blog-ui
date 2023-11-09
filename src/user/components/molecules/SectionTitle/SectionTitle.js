import { Stack } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";
import SeeAllButton from "../../atoms/SeeAllButton/SeeAllButton";
import Filter from "../Filter/Filter";

export default function SectionTitle(props) {
  return (
    <Stack
      direction={"row"}
      width={props.width ? props.width : "100%"}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "20px",
      }}
    >
      <Text fontWeight={props.fontWeight ? props.fontWeight : "500"} color={props.color} fontSize={props.fontSize ? props.fontSize : "28px"}>
        {props.title}
      </Text>
      {props.filter && <Filter post={props.post} />}
      {props.see && <SeeAllButton link={props.link}/>}
    </Stack>
  );
}
