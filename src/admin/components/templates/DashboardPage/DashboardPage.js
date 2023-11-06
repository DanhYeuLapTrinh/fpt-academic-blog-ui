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
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosPrivate.get("admin/dashboard").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" fontWeight={"bold"} sx={{ mb: 5 }}>
        Hi, {username}
      </Typography>

      <Grid container spacing={3}>
        {data && (
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
                title="Hồ sơ bị báo cáo"
                total={data.total_reported_profile}
                color="warning"
                icon={"carbon:report"}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Bình luận bị báo cáo"
                total={data.total_reported_comment}
                color="error"
                icon={"ic:round-report"}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} md={6} lg={8}>
          <SimpleCharts title="Lượng truy cập trang theo tuần" />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <BasicPie title="Trình duyệt truy cập" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardPage;
