import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import Text from "../../../atoms/Text/Text";
import Author from "../../../molecules/Author/Author";
import PostTag from "../../../atoms/PostTag/PostTag";
import Wrapper from "../../../atoms/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { getFirstChar, toSlug } from "../../../../utils/StringMethod";
import { Icon } from "@iconify/react";
export default function RewardedPostsUnder({
  removeDraft,
  removePost,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f7f9fc",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <Stack direction={"row"}>
        <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
          <Box
            sx={{
              backgroundImage: `url(${props.url})`,
              width: "265px",
              height: "240px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {props.isRewarded && (
              <Link to={"/rewarded"}>
                <RewardBadge
                  small={true}
                  position="absolute"
                  top="10px"
                  right="10px"
                  zIndex="1"
                />
              </Link>
            )}
          </Box>
        </Link>
        <Box sx={{ width: "calc(100% - 265px)", p: "0px 20px" }}>
          <Stack height={"240px"} justifyContent={"space-evenly"}>
            <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
              <Wrapper WebkitLineClamp="2">
                <Text fontSize="24px" lineHeight="30px">
                  {props.title}
                </Text>
              </Wrapper>
            </Link>
            {/* {props.approve && (
              <LecturerMenuService
                isRewarded={props.isRewarded}
                postId={props.postId}
              />
            )} */}
            <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
              <Wrapper WebkitLineClamp="3">
                <Text fontWeight="400" fontSize="14px">
                  {props.description}
                </Text>
              </Wrapper>
            </Link>
            <Author
              time={props.time}
              src={props.avatar}
              author={true}
              text={props.label}
              profile={props.userId}
              favorite={props.favorite}
            />
            <Stack
              direction={"row"}
              spacing={"12px"}
              paddingTop={"5px"}
              alignItems={"center"}
            >
              <Link
                to={{
                  pathname: "/categories",
                  search: `?name=${toSlug(props.majorName, true)}&id=${
                    props.majorID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={getFirstChar(props.majorName)}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                  bgcolor={props.draft ? "primary.main" : ""}
                  padding={props.draft && "5px 10px"}
                  borderRadius={props.draft && "5px"}
                />
              </Link>
              <Link
                to={{
                  pathname: "/categories",
                  search: `?name=${toSlug(props.subjectName, true)}&id=${
                    props.subjectID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={props.subjectName}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                  bgcolor={props.draft ? "primary.main" : ""}
                  padding={props.draft && "5px 10px"}
                  borderRadius={props.draft && "5px"}
                />
              </Link>
              <Link
                to={{
                  pathname: "/tags",
                  search: `?name=${toSlug(props.tagName, true)}&id=${
                    props.tagID
                  }`,
                }}
                style={{ textDecoration: "none" }}
              >
                <PostTag
                  text={props.tagName}
                  color={props.tagColor ? props.tagColor : "primary.main"}
                  bgcolor={props.draft ? "primary.main" : ""}
                  padding={props.draft && "5px 10px"}
                  borderRadius={props.draft && "5px"}
                />
              </Link>
              {props.draft && !props.favorite && (
                <IconButton
                  sx={{
                    p: "5px 20px",
                    bgcolor: "#e5e6ed",
                    borderRadius: "5px",
                  }}
                  onClick={handleClick}
                >
                  <Icon icon="bi:three-dots" color="#444746" width="22" />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 25,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Link to={`${props?.slug}`} style={{textDecoration: "none"}}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Icon icon="uil:edit" color="#444746" width="24" />
                    </ListItemIcon>
                    <Text fontSize="14px">
                      Sửa {props.declined ? "bài viết" : "bản nháp"}
                    </Text>
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={
                    !props.declined
                      ? () => removeDraft(props?.postId)
                      : () => removePost(props?.postId)
                  }
                >
                  <ListItemIcon>
                    <Icon
                      icon="ant-design:delete-outlined"
                      color="red"
                      width="24"
                    />
                  </ListItemIcon>
                  <Text fontSize="14px" color="red">
                    Xóa
                  </Text>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
