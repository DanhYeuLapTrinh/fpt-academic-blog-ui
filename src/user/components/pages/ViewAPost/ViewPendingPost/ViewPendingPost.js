import { Button, Container, FormControlLabel, Stack, Switch } from "@mui/material";
import React from "react";
import Text from "../../../atoms/Text/Text";
import styles from "./Styles.module.scss";
import AccountInfoBar from "../../../organisms/AccountInfoBar/AccountInfoBar";
import PopUpDialog from "../../../organisms/PopUpDialog/PopUpDialog";
export default function ViewPendingPost(props) {
  return (
    <Container>
      <AccountInfoBar
        src={props.data?.avatarURL}
        color="secondary.main"
        text={props.data?.accountName}
        time={props.data?.dateOfPost}
        majorName={props.data?.category[0]?.categoryName}
        majorID={props.data?.category[0]?.categoryId}
        subjectName={props.data?.category[2]?.categoryName}
        subjectID={props.data?.category[2]?.categoryId}
        tagName={props.data?.tag?.tagName}
        tagID={props.data?.tag?.tagId}
        userId={props.data?.userId}
      />
      <div className={styles.contentWrapper}>
        <Text>
          <h1 style={{ fontSize: "40px", lineHeight: "50px" }}>
            {props.data?.title}
          </h1>
        </Text>
        <img style={{ margin: "10px 0 40px" }} src={props.data?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>

      <FormControlLabel
        control={<Switch color="warning" onChange={props.handleGiveReward} />}
        label={<Text>Trao thưởng</Text>}
      />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={1}
        padding={"0 0 30px"}
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
