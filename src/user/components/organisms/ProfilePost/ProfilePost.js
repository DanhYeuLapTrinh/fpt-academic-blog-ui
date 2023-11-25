import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import {
  getFirstChar,
  timeConverter,
  toSlug,
} from "../../../utils/StringMethod";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import usePostAPI from "../../pages/ViewAPost/ViewAPost";
import ViewAPost from "../../pages/ViewAPost/ViewAPost/ViewAPost";

export default function ProfilePost({ removePost, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [preview, setPreview] = useState();
  const open = Boolean(anchorEl);
  const { getPostDetails } = usePostAPI();
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePreview = async (slug) => {
    try {
      let postDetail = await getPostDetails(slug);
      setPreview(postDetail);
      handleClickOpen();
    } catch (error) {}
  };
  return (
    <Stack direction={"row"} gap={"20px"}>
      <Link to={props.link} style={{ textDecoration: "none" }}>
        <Box  
          sx={{
            width: "241px",
            height: "149px",
            backgroundImage: `url(${props.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          {props.isRewarded && (
            <Link to={"/rewarded"}>
              <RewardBadge
                small={props.small}
                position="absolute"
                top="15px"
                right="15px"
                zIndex="1"
              />
            </Link>
          )}
        </Box>
      </Link>
      <Box width={"calc(100% - 261px)"}>
        <Stack justifyContent={"space-around"} height={"100%"}>
          <Link to={props.link} style={{ textDecoration: "none" }}>
            <Wrapper WebkitLineClamp="2">
              <Text
                fontSize={props.title}
                lineHeight={"32px"}
                color={props.color}
              >
                {props.postTitle}
              </Text>
            </Wrapper>
          </Link>
          <Link to={props.link} style={{ textDecoration: "none" }}>
            <Wrapper WebkitLineClamp="2">
              <Text fontWeight="400" fontSize="14px">
                {props.description}
              </Text>
            </Wrapper>
          </Link>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Text fontSize="12px">Nằm trong: </Text>
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
                  />
                </Link>
              </Stack>
              {props.pending && (
                <>
                  <IconButton
                    sx={{
                      p: "3px 10px",
                      bgcolor: "#e5e6ed",
                      borderRadius: "5px",
                    }}
                    onClick={handleClick}
                  >
                    <Icon icon="bi:three-dots" color="#444746" width="16" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
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
                    <MenuItem onClick={() => handlePreview(props.slug)}>
                      <ListItemIcon>
                        <Icon icon="ph:eye-bold" color="#444746" width="22" />
                      </ListItemIcon>
                      <Text fontSize="14px">Bản xem trước</Text>
                    </MenuItem>
                    <Dialog open={openDialog} maxWidth="lg">
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{ p: "14px" }}
                      >
                        <Box />
                        <Text fontSize="20px">Xem trước bài viết</Text>
                        <IconButton
                          sx={{
                            p: "8px",
                          }}
                          disableFocusRipple
                          disableRipple
                          disableTouchRipple
                          onClick={handleCloseDialog}
                        >
                          <Icon
                            icon="octicon:x-12"
                            color="#444746 "
                            width="20"
                          />
                        </IconButton>
                      </Stack>
                      <Divider orientation="horizontal" />
                      <DialogContent
                        sx={{
                          p: "20px 0 0",
                        }}
                      >
                        <ViewAPost previewHistory postDetail={preview} />
                      </DialogContent>
                    </Dialog>
                    <MenuItem onClick={() => removePost(props.postId)}>
                      <ListItemIcon>
                        <Icon
                          icon="ant-design:delete-outlined"
                          color="red"
                          width="22"
                        />
                      </ListItemIcon>
                      <Text fontSize="14px" color="red">
                        Xóa
                      </Text>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Stack>
            <Text fontSize="12px">{timeConverter(props.time)}</Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
