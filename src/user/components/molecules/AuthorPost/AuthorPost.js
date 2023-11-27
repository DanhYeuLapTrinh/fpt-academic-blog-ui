import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Icon } from "@iconify/react";
import { Button, Chip, Stack } from "@mui/material";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import { timeConverter } from "../../../utils/StringMethod";
import { Link } from "react-router-dom";
import usePost from "../../../hooks/usePost";

export default function AuthorPost({ handleActions, ...props }) {
  const auth = useAuth();
  const { postDetail } = usePost();
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"10px"}>
      <Link to={`/profile/${props.userId}`}>
        <UserProfile
          width={props.avatarWidth ? props.avatarWidth : "28px"}
          height={props.avatarHeight ? props.avatarHeight : "28px"}
          src={props.src}
          alt="User"
        />
      </Link>
      <Stack spacing={"4px"}>
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"14px"}>
          <Link
            to={`/profile/${props.userId}`}
            style={{ textDecoration: "none" }}
          >
            <Text
              fontSize={props.authorSize ? props.authorSize : "12px"}
              color={props.color ? props.color : "text.main"}
            >
              {props.text}
            </Text>
          </Link>
          {auth?.id !== props.userId && !props.previewHistory ? (
            <Button
              sx={{ textTransform: "none", borderRadius: "20px" }}
              size="small"
              onClick={
                props.isFollowing
                  ? () => handleActions("unfollow")
                  : () => handleActions("follow")
              }
              startIcon={
                props.isFollowing ? (
                  <Icon icon="mingcute:check-fill" width="14" />
                ) : (
                  <Icon icon="vaadin:plus" width={"14px"} />
                )
              }
              variant={props.isFollowing ? "contained" : "outlined"}
            >
              <Text
                fontSize="12px"
                color={props.isFollowing ? "secondary.main" : "primary.main"}
              >
                {props.isFollowing ? "Đang theo dõi" : "Theo dõi"}
              </Text>
            </Button>
          ) : (
            ""
          )}
          {postDetail?.userBadge?.map((badge, index) => (
            <Text>
              <Chip
                key={index}
                label={
                  badge.badgeName === "Lecturer"
                    ? "Giảng viên"
                    : badge.badgeName
                }
                size="small"
                sx={{
                  minWidth: "50px",
                  borderRadius: "5px",
                  color: "#FF8300",
                  bgcolor: "#FFEDCB",
                }}
              />
            </Text>
          ))}
        </Stack>
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"6px"}>
          <Text
            fontSize="12px"
            lineHeight="12px"
            color={props.color ? props.color : "text.main"}
          >
            {timeConverter(props.time)}
          </Text>
          {!props.previewHistory && (
            <>
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
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
