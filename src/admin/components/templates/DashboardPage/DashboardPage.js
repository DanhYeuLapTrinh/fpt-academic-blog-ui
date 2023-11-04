import React, { useEffect, useState } from "react";

import AppWidgetSummary from "../../molecules/GetSummary/GetSummary";

import { Grid, Container, Typography } from "@mui/material";

import useAuth from "../../../../user/hooks/useAuth";

import useAxiosPrivate from "../../../../user/hooks/useAxiosPrivate";

import SimpleCharts from "../../molecules/BarChart/SimpleBarChart";
import BasicPie from "../../molecules/PieChart/PieChart";
function DashboardPage() {
  const auth = useAuth();
  const username = auth?.user;
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPrivate
      .get("https://6545c4e4fe036a2fa954c60c.mockapi.io/dashboard")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={"bold"} sx={{ mb: 5 }}>
        Hi, {username}
      </Typography>

      <Grid container spacing={3}>
        {data !== null && data.length > 0 && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng bài viết"
                total={data[0].totalPost}
                icon={"iconoir:post-solid"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng người dùng"
                total={data[0].totalUser}
                color="info"
                icon={"mdi:user"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Tổng số truy cập"
                total={data[0].totalAccess}
                color="success"
                icon={"icon-park-solid:connect"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Số lượng báo cáo"
                total={data[0].totalReport}
                color="error"
                icon={"ic:round-report"}
              />
            </Grid>
          </>
        )}

        <SimpleCharts />
        <BasicPie />
      </Grid>
    </Container>
  );
}

export default DashboardPage;
