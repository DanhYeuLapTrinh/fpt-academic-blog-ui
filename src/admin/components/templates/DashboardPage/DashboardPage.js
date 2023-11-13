import React, { useEffect, useState } from "react";

import AppWidgetSummary from "../../molecules/GetSummary/GetSummary";

import {
  Grid,
  Container,
  Typography,
  CardHeader,
  Box,
  Card,
} from "@mui/material";

import useAuth from "../../../../user/hooks/useAuth";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

import SimpleCharts from "../../molecules/BarChart/SimpleBarChart";

function DashboardPage() {
  const auth = useAuth();
  const username = auth?.user;
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);

  const totalReports =
    data.total_reported_comment + data.total_reported_profile;

  console.log(data);

  const fetchData = async () => {
    const res = await axiosPrivate.get("admin/dashboard");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              total={data.total_post}
              icon={"iconoir:post-solid"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số lượng người dùng"
              total={data.total_user}
              color="info"
              icon={"mdi:user"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Lượng truy cập ngày hôm nay"
              total={data.total_visit}
              color="success"
              icon={"carbon:report"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số lượng báo cáo"
              total={totalReports}
              color="error"
              icon={"ic:round-report"}
            />
          </Grid>
        </>

        <Grid item xs={12} md={6} lg={6}>
          <SimpleCharts totalVisit={data.total_visit} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
