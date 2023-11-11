import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardHeader } from "@mui/material";

export default function SimpleCharts({ totalVisit }) {
  const now = new Date();

  const firstDayOfWeek = new Date(
    now.setDate(now.getDate() - now.getDay() + 1)
  );

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(
      new Date(
        firstDayOfWeek.getTime() + i * 24 * 60 * 60 * 1000
      ).toLocaleDateString("vi-VN")
    );
  }

  const [visits, setVisits] = React.useState(
    JSON.parse(localStorage.getItem("visits")) || [0, 0, 0, 0, 0, 0, 0]
  );

  React.useEffect(() => {
    const date = new Date();
    const dayOfWeek = (date.getDay() + 6) % 7;

    setVisits((prevVisits) => {
      const newVisits = [...prevVisits];
      newVisits[dayOfWeek] = totalVisit;
      return newVisits;
    });
  }, [totalVisit]);

  React.useEffect(() => {
    localStorage.setItem("visits", JSON.stringify(visits));
  }, [visits]);

  return (
    <Card>
      <CardHeader
        title={`Lượng truy cập từ ngày ${firstDayOfWeek.toLocaleDateString(
          "vi-VN"
        )} đến ${daysOfWeek[6]}`}
      />

      <Box sx={{ p: 1, pb: 1 }} dir="ltr">
        <BarChart
          xAxis={[
            {
              data: [
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
                "Chủ nhật",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: visits,
            },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Card>
  );
}
