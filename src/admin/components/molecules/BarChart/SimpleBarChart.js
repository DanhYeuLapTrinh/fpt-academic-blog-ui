import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardHeader } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function SimpleCharts({ totalVisit }) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const totalVisitWithoutYear = totalVisit
    ? Object.keys(totalVisit).reduce((acc, dateKey) => {
        const [year, month, day] = dateKey.split("-");
        const newDateKey = `${day}-${month}`;
        acc[newDateKey] = totalVisit[dateKey];
        return acc;
      }, {})
    : {};

  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(new Date());

  const getDaysBetweenDates = (start, end) => {
    const days = [];
    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = getDaysBetweenDates(startDate, endDate).map((date) => {
    const dateKey = `${date.getDate()}-${date.getMonth() + 1}`;
    return dateKey;
  });

  const chartData = days.map((dateKey) => {
    return totalVisitWithoutYear && totalVisitWithoutYear[dateKey]
      ? totalVisitWithoutYear[dateKey]
      : 0;
  });

  return (
    <Box>
      <Card>
        <CardHeader title="Lượng truy cập vào trang Fblog" />
        <DatePicker
          label="Ngày bắt đầu"
          value={startDate}
          onChange={setStartDate}
          minDate={oneWeekAgo}
          maxDate={endDate}
          sx={{ ml: 1 }}
        />

        <DatePicker
          label="Ngày kết thúc"
          value={endDate}
          onChange={(date) => {
            setEndDate(date);
            setStartDate(new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000));
          }}
          minDate={startDate}
          sx={{ ml: 3 }}
        />

        <Box sx={{ pb: 1 }} dir="ltr">
          <BarChart
            xAxis={[
              {
                data: days,
                scaleType: "band",
                label: "Ngày tháng",
              },
            ]}
            series={[
              {
                data: chartData,
                label: "Lượng truy cập từng ngày",
              },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Card>
    </Box>
  );
}
