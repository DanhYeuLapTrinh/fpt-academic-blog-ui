import React from "react";
import { Paper, CardHeader, Grid } from "@mui/material";
function ContentDetail() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper>
          <CardHeader title="Thông tin cá nhân" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        This is Post
      </Grid>
    </Grid>
  );
}

export default ContentDetail;
