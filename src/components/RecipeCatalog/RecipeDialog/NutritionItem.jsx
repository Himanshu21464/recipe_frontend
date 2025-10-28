import React from "react";
import { Grid, Typography } from "@mui/material";

const NutritionItem = ({ label, value }) => (
  <Grid item xs={6} sm={3}>
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {label}:
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.9 }}>
      {value}
    </Typography>
  </Grid>
);

export default NutritionItem;
