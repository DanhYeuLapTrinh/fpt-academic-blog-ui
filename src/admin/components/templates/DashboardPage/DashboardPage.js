import React, { useEffect, useState } from "react";

import AppWidgetSummary from "../../molecules/GetSummary/GetSummary";

import { Grid, Container, Typography } from "@mui/material";

import useAuth from "../../../../user/hooks/useAuth";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

import SimpleCharts from "../../molecules/BarChart/SimpleBarChart";

import CircularProgress from "@mui/material/CircularProgress";

function DashboardPage() {
  const auth = useAuth();
  const username = auth?.user;
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalReports =
    (data.total_reported_comment || 0) + (data.total_reported_profile || 0);

  const displayTotalReports = loading ? <CircularProgress /> : totalReports;

  console.log(data);

  const fetchData = async () => {
    const res = await axiosPrivate.get("admin/dashboard");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const todayVisits =
    data.total_visit && data.total_visit[todayKey] ? (
      data.total_visit[todayKey]
    ) : (
      <CircularProgress />
    );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={"bold"} sx={{ mb: 5 }}>
        Hi, {username} 👋
      </Typography>

      <Grid container spacing={3}>
        <>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số lượng bài viết"
              total={data.total_post || <CircularProgress />}
              icon={"iconoir:post-solid"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số lượng người dùng"
              total={data.total_user || <CircularProgress />}
              color="info"
              icon={"mdi:user"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Truy cập ngày hôm nay"
              total={todayVisits}
              color="success"
              icon={"mdi:chart-bar"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số lượng báo cáo"
              total={displayTotalReports}
              color="error"
              icon={"ic:round-report"}
            />
          </Grid>
        </>

        <Grid item xs={12} md={9} lg={9}>
          <SimpleCharts totalVisit={data.total_visit} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
