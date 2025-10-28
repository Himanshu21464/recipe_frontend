/* eslint-disable no-unused-vars */
// src/components/HomePage/HowToUseSection.jsx
import React from "react";
import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { howToUseSteps } from "./data.jsx";

const HowToUseSection = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        backgroundColor: "#f1f1f1",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#333", marginBottom: 3 }}
      >
        How to Use RecipeHub
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {howToUseSteps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper sx={{ padding: 3, textAlign: "center" }}>
              {step.icon}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {step.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);

export default HowToUseSection;
