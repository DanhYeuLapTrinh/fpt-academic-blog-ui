import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Card, CardHeader } from "@mui/material";

const data = [
  { id: 0, value: 10, label: "Chrome" },
  { id: 1, value: 15, label: "Safari" },
  { id: 2, value: 20, label: "Edge" },
];

export default function BasicPie(title) {
  return (
    <Card>
      <CardHeader title={title.title} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      </Box>
    </Card>
  );
}
