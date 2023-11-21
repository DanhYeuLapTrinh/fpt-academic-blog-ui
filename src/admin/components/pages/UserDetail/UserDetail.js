import React, { useEffect } from "react";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import { Avatar, Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";
import InformationDetail from "../../organisms/UserDetail/InformationDetail";
import AvatarDetail from "../../organisms/UserDetail/AvatarDetail";
function UserDetail() {
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const { profileDetail, setProfileDetail, getUserById } = useUserContext();

  const avatar = profileDetail.profileUrl;

  const user = getUserById(id);

  const fetchData = async () => {
    try {
      const res = await axiosPrivate.post(process.env.REACT_APP_VIEW_PROFILE, {
        userId: id,
      });

      setProfileDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Container>
          <Typography variant="h6">
            Không tìm thấy hồ sơ người dùng này
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      <Container className="container">
        <TitleHeader title="Chi tiết hồ sơ" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AvatarDetail avatar={avatar} profileDetail={profileDetail} />
          </Grid>

          <Grid item xs={12} md={8}>
            <InformationDetail />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UserDetail;
