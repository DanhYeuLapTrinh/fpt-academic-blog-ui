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
  Stack,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import Text from "../../../atoms/Text/Text";
import styles from "./Styles.module.scss";
import AccountInfoBar from "../../../organisms/AccountInfoBar/AccountInfoBar";
import PopUpDialog from "../../../organisms/PopUpDialog/PopUpDialog";
import { Icon } from "@iconify/react";
export default function ViewPendingPost(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
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
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"20px"}
      >
        <Text fontSize="40px">
          <h1 style={{ fontSize: "40px" }}>{props.data?.title}</h1>
        </Text>
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
        <Dialog open={open} maxWidth="lg">
          <DialogContent sx={{ p: 0 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              p={2}
              sx={{ minWidth: "400px" }}
              justifyContent={"space-between"}
            >
              <Text fontSize="26px">Lý do từ chối</Text>
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
            <Box sx={{ p: 2 }}>{props.data?.reasonOfDecline}</Box>
          </DialogContent>
        </Dialog>
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
