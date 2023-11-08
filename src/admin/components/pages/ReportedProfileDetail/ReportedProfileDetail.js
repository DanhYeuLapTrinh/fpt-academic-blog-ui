import React, { useEffect, useState } from "react";
import BodyDetail from "../../organisms/ReportedProfileDetail/BodyDetail";
import { Box, Container } from "@mui/material";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import ContentDetail from "../../organisms/ReportedProfileDetail/ContentDetail";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import "./styles.scss";

function ReportedProfileDetail() {
  const { reportedUserId } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [reportedUser, setReportedUser] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_VIEW_PROFILE, {
        userId: reportedUserId,
      });

      if (res?.status === 200) {
        setReportedUser(res?.data);
        console.log(res?.data);
      }
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
        "-webkit-box-flex": 1,
        flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      <Container className="container">
        <TitleHeader title="Hồ sơ" />
        <BodyDetail fullName={reportedUser.fullname} />
        <ContentDetail
          userStory={reportedUser.userStory}
          fullName={reportedUser.fullname}
        />
      </Container>
    </Box>
  );
}

export default ReportedProfileDetail;
