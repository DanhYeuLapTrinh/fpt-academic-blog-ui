import { Button, Container, Stack } from "@mui/material";
import React from "react";
import AccountInfoBar from "../../../organisms/AccountInfoBar/AccountInfoBar";
import Text from "../../../atoms/Text/Text";
import styles from "./Styles.module.scss";
export default function ViewPendingQuestion(props) {
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
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={1}
        padding={"0 0 30px"}
        mt="20px"
      >
        <Button
          onClick={props.handleDecline}
          sx={{ padding: "10px", textTransform: "none" }}
          fullWidth
          variant="outlined"
        >
          Từ chối
        </Button>
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
