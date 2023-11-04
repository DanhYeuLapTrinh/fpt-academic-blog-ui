import React, { useEffect, useState } from "react";

import AppWidgetSummary from "../../molecules/GetSummary/GetSummary";

import { Grid, Container, Typography } from "@mui/material";

import axios from "axios";

import useAuth from "../../../../user/hooks/useAuth";

function DashboardPage() {
  const [dataDashboard, setDataDashboard] = useState(null);

  const auth = useAuth();

  const username = auth?.user;

  useEffect(() => {
    axios
      .get("https://6545c4e4fe036a2fa954c60c.mockapi.io/dashboard")
      .then((res) => {
        setDataDashboard(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={"bold"} sx={{ mb: 5 }}>
        Hi, {username}
      </Typography>

      <Grid container spacing={3}>
        {dataDashboard !== null && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng bài viết"
                total={dataDashboard[0].totalPost}
                icon={"iconoir:post-solid"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng người dùng"
                total={dataDashboard[0].totalUser}
                color="info"
                icon={"mdi:user"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Tổng số truy cập"
                total={dataDashboard[0].totalAccess}
                color="success"
                icon={"icon-park-solid:connect"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng báo cáo"
                total={dataDashboard[0].totalReport}
                color="error"
                icon={"ic:round-report"}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}

export default DashboardPage;
