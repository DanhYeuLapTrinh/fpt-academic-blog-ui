import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardHeader } from "@mui/material";
export default function SimpleCharts(title) {
  return (
    <Card>
      <CardHeader title={title.title} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: [
                "Chủ nhật",
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [100, 200, 300, 250, 50, 300, 400],
            },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Card>
  );
}
