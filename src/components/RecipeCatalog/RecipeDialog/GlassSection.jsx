import React from "react";
import { Box, Typography } from "@mui/material";

const GlassSection = ({ title, children }) => (
  <Box
    sx={{
      width: "100%",
      p: 3,
      borderRadius: 3,
      mb: 2,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(12px)",
      boxShadow: "inset 0 0 15px rgba(0,0,0,0.1)",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        mb: 1.5,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default GlassSection;
