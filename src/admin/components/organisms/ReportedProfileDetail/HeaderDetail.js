import React, { useEffect, useState } from "react";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
import { Avatar, Box, Stack, Typography, Paper, Button } from "@mui/material";
import DismissDialog from "../../molecules/ReportedComment/DismissDialog";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import BanReportedProfile from "../../molecules/BanReportedProfile/BanReportedProfile";
import {
  PaperSx,
  fullNameSx,
  subHeaderSx,
  backgroundDetailBottom,
  stackAvatarSx,
  avatarSx,
} from "../../molecules/HeaderDetailSx/HeaderDetailSx";

import { toast } from "react-toastify";

function HeaderDetail({ id }) {
  const { reportedProfile } = useReportedProfileContext();

  const coverURL = reportedProfile.coverUrl;

  const defaultCoverURL =
    "https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg";

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const postList = reportedProfile.postList || [];

  const fullName = reportedProfile.fullname || "";

  const avatar = postList.map((post) => post.avatarURL);

  const firstAvatarURL = avatar.length > 0 ? avatar[0] : null;

  const [dismissDialogOpen, setDismissDialogOpen] = useState(false);

  const [banStatus, setBanStatus] = useState({});

  const handleBanSuccess = () => {
    const updatedBanStatus = { ...banStatus, [id]: true };
    setBanStatus(updatedBanStatus);
  };
  const handleDismiss = async () => {
    await axiosPrivate
      .post("admin/dismiss-reported-profile", {
        reportedUserId: id,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Gỡ báo cáo hồ sơ thành công");
          navigate("/reported-profile");
        }
        setDismissDialogOpen(false);
      })
      .catch((err) => {
        toast.error("Gỡ báo cáo hồ sơ thất bại");
      });
  };

  const banAccount = (id) => {
    return axiosPrivate.post(process.env.REACT_APP_BAN_ACCOUNT, { id });
  };

  const openDismiss = async (id) => {
    setDismissDialogOpen(true);
  };

  const handleCancel = () => {
    setDismissDialogOpen(false);
  };

  return (
    <Paper sx={PaperSx}>
      <Box
        sx={{
          height: "100%",
          color: "rgb(255, 255, 255)",
          background: coverURL
            ? `url(${coverURL})`
            : `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(${defaultCoverURL})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <Stack sx={stackAvatarSx}>
          <Avatar
            sx={avatarSx}
            src={
              firstAvatarURL === null ? "/assets/img/blank.png" : firstAvatarURL
            }
          />
        </Stack>
        <Stack
          sx={{
            marginLeft: 22,
            textAlign: "unset",
            position: "absolute",
            bottom: "55px",
          }}
        >
          <Typography sx={fullNameSx}>{fullName}</Typography>
          <Typography sx={subHeaderSx}>
            <span style={{ marginRight: "20px" }}>
              {reportedProfile.numOfPost} bài viết
            </span>
            <span>{reportedProfile.numOfFollower} người theo dõi</span>
          </Typography>
        </Stack>
      </Box>
      <div style={backgroundDetailBottom}>
        <BanReportedProfile
          userId={id}
          banUserCallback={banAccount}
          banStatus={banStatus}
          onBanSuccess={handleBanSuccess}
        />
        <Button
          onClick={() => openDismiss(id)}
          variant="contained"
          sx={{ borderRadius: "20px", marginLeft: "20px" }}
        >
          Gỡ bỏ báo cáo
        </Button>
      </div>

      <DismissDialog
        open={dismissDialogOpen}
        onDismiss={handleDismiss}
        onCancel={handleCancel}
        title="Xác nhận"
        content={
          <span>
            Bạn có chắc chắn <span style={{ fontWeight: "bolder" }}>GỠ</span>{" "}
            báo cáo hồ sơ này?
          </span>
        }
      />
    </Paper>
  );
}

export default HeaderDetail;
