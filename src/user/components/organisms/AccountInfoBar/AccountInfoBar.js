import { Box, Chip, Stack } from "@mui/material";
import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import {
  getFirstChar,
  timeConverter,
  toSlug,
} from "../../../utils/StringMethod";
import { Link } from "react-router-dom";

export default function AccountInfoBar(props) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={1}>
        {props.majorName && (
          <Link
            to={{
              pathname: "/categories",
              search: `?name=${toSlug(props.majorName, true)}&id=${
                props.majorID
              }`,
            }}
          >
            <Chip
              sx={{ bgcolor: "primary.main", borderRadius: "5px", color: "white", fontWeight: 600 }}
              label={getFirstChar(props.majorName)}
            />
          </Link>
        )}
        {props.subjectName && (
          <Link
            to={{
              pathname: "/categories",
              search: `?name=${toSlug(props.subjectName, true)}&id=${
                props.subjectID
              }`,
            }}
          >
            <Chip
              sx={{ bgcolor: "primary.main", borderRadius: "5px", color: "white", fontWeight: 600 }}
              label={props.subjectName}
            />
          </Link>
        )}
        {props.tagName && (
          <Link
            to={{
              pathname: "/tags",
              search: `?name=${toSlug(props.tagName, true)}&id=${props.tagID}`,
            }}
          >
            <Chip
              sx={{ bgcolor: "primary.main", borderRadius: "5px", color: "white", fontWeight: 600 }}
              label={props.tagName}
            />
          </Link>
        )}
      </Stack>
    </Stack>
  );
}
