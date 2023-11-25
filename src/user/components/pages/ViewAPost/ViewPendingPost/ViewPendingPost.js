import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import Text from "../../../atoms/Text/Text";
import styles from "./Styles.module.scss";
import PopUpDialog from "../../../organisms/PopUpDialog/PopUpDialog";
import { Icon } from "@iconify/react";
import AuthorPost from "../../../molecules/AuthorPost/AuthorPost";
import AccountInfoBar from "../../../organisms/AccountInfoBar/AccountInfoBar";
import { Link } from "react-router-dom";
import UserProfile from "../../../atoms/UserProfile/UserProfile";
export default function ViewPendingPost({
  setHasGiveReward,
  hasGiveReward,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [openReward, setOpenReward] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClickRewarded = () => {
    setOpenReward(true);
  };
  const handleCloseRewarded = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenReward(false);
    }
  };
  return (
    <Container sx={{ minHeight: "calc(130vh - 93px)", mb: "100px" }}>
      {hasGiveReward && !openNoti && (
        <Paper sx={{ mt: 3 }}>
          <Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Text fontSize="26px" padding="16px 16px 8px 16px">
                Thông báo
              </Text>
              <IconButton
                sx={{
                  p: "10px",
                  mr: "10px",
                }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() => setOpenNoti(true)}
              >
                <Icon icon="octicon:x-12" color="#444746 " width="20" />
              </IconButton>
            </Stack>
            <Divider orientation="horizontal" />
            <Text padding="16px">
              {props?.data?.rewarder?.length === 1
                ? "Bài viết này đã được trao thưởng bởi bạn trước đó"
                : `Bài viết này đã được trao thưởng bởi bạn và ${
                    props.data?.rewarder?.length - 1
                  } người khác trước đó`}
            </Text>
            <Button
              onClick={handleClickRewarded}
              sx={{ textTransform: "none", borderRadius: "0 0 5px 5px" }}
              variant="contained"
            >
              Nhấn để xem
            </Button>
            <Dialog
              disableEscapeKeyDown
              open={openReward}
              onClose={handleCloseRewarded}
              maxWidth="md"
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ p: "14px", minWidth: "500px" }}
              >
                <Box />
                <Text fontSize="20px">Người trao thưởng</Text>
                <IconButton
                  sx={{
                    p: "8px",
                  }}
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={handleCloseRewarded}
                >
                  <Icon icon="octicon:x-12" color="#444746 " width="20" />
                </IconButton>
              </Stack>
              <Divider orientation="horizontal" />
              <DialogContent sx={{ p: 0 }}>
                <Stack sx={{ p: 3 }} spacing={4} width={"100%"}>
                  {props?.data?.rewarder?.map((item) => (
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      width={"100%"}
                      flexWrap={"wrap"}
                    >
                      <Link
                        to={`/profile/${item.userId}`}
                        style={{ textDecoration: "none" }}
                      >
                        <UserProfile
                          src={item.avatarURL}
                          width="40px"
                          height="40px"
                        />
                      </Link>
                      <Stack>
                        <Link
                          to={`/profile/${item.userId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Text>{item.fullName}</Text>
                        </Link>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          flexWrap={"wrap"}
                          width={"100%"}
                        >
                          {item.badges.map((badge) => (
                            <Text>
                              <Chip
                                label={
                                  badge.badgeName === "Lecturer"
                                    ? "Giảng viên"
                                    : badge.badgeName
                                }
                                size="small"
                                sx={{
                                  minWidth: "50px",
                                  borderRadius: "5px",
                                  color: "primary.main",
                                }}
                              />
                            </Text>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </DialogContent>
            </Dialog>
          </Stack>
        </Paper>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"20px"}
      >
        <Text fontSize="40px">
          <h1 style={{ fontSize: "40px" }}>{props.data?.title}</h1>
        </Text>
        <Dialog open={open} maxWidth="lg">
          <DialogContent sx={{ p: 0 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              p={2}
              sx={{ minWidth: "500px" }}
              justifyContent={"space-between"}
            >
              <Text fontSize="26px">Bài viết này đã từng bị từ chối</Text>
              <IconButton
                sx={{
                  p: "8px",
                }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={handleCloseDialog}
              >
                <Icon icon="octicon:x-12" color="#444746 " width="20" />
              </IconButton>
            </Stack>
            <Divider orientation="horizontal" />
            <Box sx={{ p: 2 }}>
              <Text>
                <span style={{ fontWeight: "400" }}>Lý do:</span>{" "}
                {props.data?.reasonOfDecline}
              </Text>
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={"10px 0"}
      >
        <AuthorPost
          src={props.data?.avatarURL}
          text={props.data?.accountName}
          time={props.data?.dateOfPost}
          userId={props.data?.userId}
          comments={props.data?.comments?.length}
          isFollowing={props.isFollowing}
          unfollowAccount={props.unfollowAccount}
          followAccount={props.followAccount}
          avatarWidth="45px"
          avatarHeight="45px"
          authorSize="16px"
          previewHistory
        />
        <Stack direction={"row"} spacing={1}>
          <AccountInfoBar
            majorName={props.data?.category[0]?.categoryName}
            majorID={props.data?.category[0]?.categoryId}
            subjectName={props.data?.category[2]?.categoryName}
            subjectID={props.data?.category[2]?.categoryId}
            tagName={props.data?.tag.tagName}
            tagID={props.data?.tag.tagId}
          />
          {props.data?.reasonOfDecline && (
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Xem lý do từ chối
            </Button>
          )}
        </Stack>
      </Stack>
      <div className={styles.contentWrapper}>
        <img style={{ margin: "0px 0 40px" }} src={props.data?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        m={"30px 0 20px"}
      >
        {props.data?.postSkill?.map((item) => (
          <Text>
            <Chip
              label={item.skillName}
              sx={{
                minWidth: "50px",
                borderRadius: "5px",
                color: "secondary.main",
                bgcolor: "primary.main",
                fontSize: "16px",
              }}
            />
          </Text>
        ))}
      </Stack>
      {!hasGiveReward && (
        <FormControlLabel
          control={<Switch color="warning" onChange={props.handleGiveReward} />}
          label={<Text>Trao thưởng</Text>}
        />
      )}
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={1}
        padding={"30px 0 100px"}
      >
        <Button
          onClick={props.handleClickOpen}
          sx={{ padding: "10px", textTransform: "none" }}
          fullWidth
          variant="outlined"
        >
          Từ chối
        </Button>
        <PopUpDialog
          handleClickOpen={props.handleClickOpen}
          handleClose={props.handleClose}
          handleDecline={props.handleDecline}
          open={props.open}
          declinedReason={props.declinedReason}
        />
        <Button
          onClick={props.handleSubmit}
          sx={{ padding: "10px", textTransform: "none" }}
          variant="contained"
          fullWidth
        >
          Phê duyệt
        </Button>
      </Stack>
    </Container>
  );
}
