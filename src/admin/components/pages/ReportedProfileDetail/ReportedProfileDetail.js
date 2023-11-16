import React, { useEffect } from "react";
import HeaderDetail from "../../organisms/ReportedProfileDetail/HeaderDetail";
import { Box, Container } from "@mui/material";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import ContentDetail from "../../organisms/ReportedProfileDetail/ContentDetail";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useReportedProfileContext } from "../../../context/ReportedProfileContext";
import { useParams } from "react-router-dom";
import "./styles.scss";

function ReportedProfileDetail() {
  const { reportedUserId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const { reportedProfile, setReportedProfile } = useReportedProfileContext();

  const { fullname, userStory } = reportedProfile;

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_VIEW_PROFILE, {
        userId: reportedUserId,
      });

      setReportedProfile(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <Container className="container">
        <TitleHeader title="Hồ sơ" />
        <HeaderDetail id={reportedUserId} />
        <ContentDetail userStory={userStory} fullName={fullname} />
      </Container>
    </Box>
  );
}

export default ReportedProfileDetail;
