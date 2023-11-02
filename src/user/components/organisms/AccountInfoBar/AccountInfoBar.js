import { Box, Chip, Stack } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import { timeConverter } from "../../../utils/StringMethod";
import { Link } from "react-router-dom";

export default function AccountInfoBar(props) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ backgroundColor: "primary.main", p: 2, mt: "20px" }}
      borderRadius={"10px"}
      height={"60px"}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Link to={""} style={{textDecoration: 'none'}}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <UserProfile
              width="28px"
              height="28px"
              src={props.src}
              alt="User"
            />
            <Text
              fontSize="14px"
              lineHeight="12px"
              color={props.color ? props.color : "text.main"}
            >
              bởi {props.text}
            </Text>
          </Stack>
        </Link>
        <Text
          fontSize="20px"
          lineHeight="20px"
          color={props.color ? props.color : "text.main"}
        >
          &middot;
        </Text>
        <Text
          fontSize="12px"
          lineHeight="12px"
          color={props.color ? props.color : "text.main"}
        >
          {timeConverter(props.time)}
        </Text>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <Link to={""}>
          <Chip
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: 600 }}
            label={props.major}
          />
        </Link>
        <Link to={""}>
          <Chip
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: 600 }}
            label={props.subject}
          />
        </Link>
        <Link to={""}>
          <Chip
            sx={{ bgcolor: "white", color: "primary.main", fontWeight: 600 }}
            label={props.tag}
          />
        </Link>
      </Stack>
    </Stack>
  );
}