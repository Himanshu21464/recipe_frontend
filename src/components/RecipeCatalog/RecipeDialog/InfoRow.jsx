import React from "react";
import { Typography } from "@mui/material";

const InfoRow = ({ label, value }) => (
  <Typography variant="body1" sx={{ mb: 0.8 }}>
    <strong>{label}:</strong> {value}
  </Typography>
);

export default InfoRow;
