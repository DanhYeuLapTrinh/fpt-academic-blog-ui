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
import PopupEdit from "../../organisms/PopupEdit/PopupEdit";
import AuthorPost from "../../molecules/AuthorPost/AuthorPost";
export default function ViewPendingReward({
  rewardPost,
  giveReward,
  dismissReward,
}) {
  return (
    <Container sx={{mt: "37px"}}>
      <Text fontSize="40px">
        <h1 style={{ fontSize: "40px" }}>{rewardPost?.title}</h1>
      </Text>
      {rewardPost?.category && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          m={"10px 0"}
        >
          <AuthorPost
            src={rewardPost?.avatarURL}
            text={rewardPost?.accountName}
            time={rewardPost?.dateOfPost}
            userId={rewardPost?.userId}
            comments={rewardPost?.comments?.length}
            avatarWidth="45px"
            avatarHeight="45px"
            authorSize="16px"
            previewHistory
          />
          <AccountInfoBar
            majorName={rewardPost?.category[0]?.categoryName}
            majorID={rewardPost?.category[0]?.categoryId}
            subjectName={rewardPost?.category[2]?.categoryName}
            subjectID={rewardPost?.category[2]?.categoryId}
            tagName={rewardPost?.tag.tagName}
            tagID={rewardPost?.tag.tagId}
          />
        </Stack>
      )}
      <div className={styles.contentWrapper}>
        <img style={{ margin: "0px 0 40px" }} src={rewardPost?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: rewardPost?.content }} />
      </div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        m={"30px 0 20px"}
      >
        {rewardPost?.postSkill?.map((item) => (
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
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={1}
        padding={"20px 0 100px"}
      >
        <Button
          onClick={dismissReward}
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
