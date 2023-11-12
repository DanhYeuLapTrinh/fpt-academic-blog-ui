import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardHeader } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function SimpleCharts({ totalVisit }) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(new Date());

  const [visits, setVisits] = useState(
    JSON.parse(localStorage.getItem("visits")) || [0, 0, 0, 0, 0, 0, 0]
  );

  useEffect(() => {
    const date = new Date();
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    setVisits((prevVisits) => {
      const newVisits = { ...prevVisits };
      newVisits[dateKey] = totalVisit;
      return newVisits;
    });
  }, [totalVisit]);

  useEffect(() => {
    localStorage.setItem("visits", JSON.stringify(visits));
  }, [visits]);

  const getDaysBetweenDates = (start, end) => {
    const days = [];
    let current = new Date(start);
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = getDaysBetweenDates(startDate, endDate);

  const visitsRange = [];
  days.forEach((day) => {
    const dateKey = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
    visitsRange.push(visits[dateKey] || 0);
  });

  const daysOfWeek = days.map((day) =>
    new Intl.DateTimeFormat("vi-VN", {
      day: "numeric",
      month: "numeric",
    }).format(day)
  );

  return (
    <Card>
      <CardHeader
        title={`Lượng truy cập từ ${startDate.toLocaleDateString(
          "vi-VN"
        )} đến ${endDate.toLocaleDateString("vi-VN")}`}
      />

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
              data: daysOfWeek,
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: visitsRange,
            },
          ]}
          width={500}
          height={300}
        />
      </Box>
    </Card>
  );
}
