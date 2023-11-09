import React from "react";
import { Paper, CardHeader, Grid, Typography } from "@mui/material";
import BodyContent from "../../molecules/ContentDetail";
function ContentDetail(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ textAlign: "center", height: "150px" }}>
          <CardHeader title="Giới thiệu cá nhân" />
          <Typography>{props.userStory}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <BodyContent props={props}/>
      </Grid>
    </Grid>
  );
}

export default ContentDetail;
