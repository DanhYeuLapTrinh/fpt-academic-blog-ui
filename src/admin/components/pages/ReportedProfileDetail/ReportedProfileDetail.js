import React, { useEffect } from "react";
import HeaderDetail from "../../organisms/ReportedProfileDetail/HeaderDetail";
import { Box, Container, Typography } from "@mui/material";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import ContentDetail from "../../organisms/ReportedProfileDetail/ContentDetail";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
import { useParams } from "react-router-dom";
import "./styles.scss";

function ReportedProfileDetail() {
  const { reportedUserId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const {
    reportedProfiles,
    setReportedProfiles,
    reportedProfile,
    setReportedProfile,
    profileFound,
    setProfileFound,
  } = useReportedProfileContext();

  const { fullname, userStory } = reportedProfile;

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_VIEW_PROFILE, {
        userId: reportedUserId,
      });

      setReportedProfile(res.data);
    } catch (err) {
      if (err.request) {
        console.log("Server không phản hồi");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const found = reportedProfiles.some(
      (profile) => profile.reportedUserId === reportedProfile.userId
    );
    setProfileFound(found);
  }, [reportedProfile.userId, reportedProfiles]);

  return (
    <Box
      sx={{
        WebkitBoxFlex: 1,
        flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      {profileFound ? (
        <Container className="container">
          <TitleHeader title="Hồ sơ" />
          <HeaderDetail id={reportedUserId} />
          <ContentDetail userStory={userStory} fullName={fullname} />
        </Container>
      ) : (
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Container>
            <Typography variant="h6">
              Hồ sơ người dùng này chưa bị báo cáo hoặc không tìm thấy
            </Typography>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default ReportedProfileDetail;
