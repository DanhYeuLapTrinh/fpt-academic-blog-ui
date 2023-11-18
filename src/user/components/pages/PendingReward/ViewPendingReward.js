import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import AccountInfoBar from "../../organisms/AccountInfoBar/AccountInfoBar";
import Text from "../../atoms/Text/Text";
import styles from "./Styles.module.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import UserProfile from "../../atoms/UserProfile/UserProfile";
export default function ViewPendingReward({ rewardPost, giveReward }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <Container>
      {rewardPost.category && (
        <AccountInfoBar
          src={rewardPost?.avatarURL}
          color="secondary.main"
          text={rewardPost?.accountName}
          time={rewardPost?.dateOfPost}
          majorName={rewardPost?.category[0]?.categoryName}
          majorID={rewardPost?.category[0]?.categoryId}
          subjectName={rewardPost?.category[2]?.categoryName}
          subjectID={rewardPost?.category[2]?.categoryId}
          tagName={rewardPost?.tag?.tagName}
          tagID={rewardPost?.tag?.tagId}
          userId={rewardPost?.userId}
        />
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"20px"}
      >
        <Text fontSize="40px">
          <h1 style={{ fontSize: "40px" }}>{rewardPost?.title}</h1>
        </Text>
        <Button
          variant="outlined"
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleClickOpen}
        >
          Xem người trao thưởng
        </Button>
        <Dialog open={open} maxWidth="lg">
          <DialogContent sx={{ p: 0 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              p={2}
              sx={{ minWidth: "400px" }}
              justifyContent={"space-between"}
            >
              <Text fontSize="26px">Số người đã trao thưởng</Text>
              <IconButton
                sx={{ p: 0 }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={handleCloseDialog}
              >
                <Icon icon="uil:x" color="#444746" width="24" />
              </IconButton>
            </Stack>
            <Divider orientation="horizontal" />
            <Box sx={{ p: 2 }}>
              {rewardPost?.rewarder?.map((item) => (
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  width={"400px"}
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
                    <Stack direction={"row"} spacing={1}>
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
            </Box>
          </DialogContent>
        </Dialog>
      </Stack>
      <div className={styles.contentWrapper}>
        <img style={{ margin: "0px 0 40px" }} src={rewardPost?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: rewardPost?.content }} />
      </div>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={1}
        padding={"0 0 30px"}
      >
        <Button
          onClick={""}
          sx={{ padding: "10px", textTransform: "none" }}
          variant="outlined"
          fullWidth
        >
          Bỏ qua
        </Button>
        <Button
          onClick={giveReward}
          sx={{ padding: "10px", textTransform: "none" }}
          variant="contained"
          fullWidth
        >
          Chấp nhận
        </Button>
      </Stack>
    </Container>
  );
}
