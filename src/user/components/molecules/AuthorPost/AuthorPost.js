import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Icon } from "@iconify/react";
import { Button, Stack } from "@mui/material";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import { timeConverter } from "../../../utils/StringMethod";

export default function AuthorPost(props) {
  const auth = useAuth();
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"10px"}>
      <UserProfile
        width={props.avatarWidth ? props.avatarWidth : "28px"}
        height={props.avatarHeight ? props.avatarHeight : "28px"}
        src={props.src}
        alt="User"
      />

      <Stack spacing={"4px"}>
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"14px"}>
          <Text
            fontSize={props.authorSize ? props.authorSize : "12px"}
            color={props.color ? props.color : "text.main"}
          >
            {props.text}
          </Text>
          {auth?.id !== props.id ? (
            <Button
              sx={{ textTransform: "none", borderRadius: "20px" }}
              size="small"
              startIcon={<Icon icon="vaadin:plus" width={"14px"} />}
              variant="contained"
            >
              <Text fontSize="12px" color={"secondary.main"}>
                Theo dõi
              </Text>
            </Button>
          ) : (
            ""
          )}
        </Stack>
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"6px"}>
          <Text
            fontSize="12px"
            lineHeight="12px"
            color={props.color ? props.color : "text.main"}
          >
            {timeConverter(props.time)}
          </Text>
          <Text
            fontSize="24px"
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
            Phản hồi:{" "}
            <span style={{ fontWeight: "600" }}>{props.comments}</span>
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
