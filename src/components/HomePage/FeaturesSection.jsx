// src/components/HomePage/FeaturesSection.jsx

import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { features } from "./data.jsx";

const FeaturesSection = () => (
  <Container maxWidth="lg">
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#333", marginBottom: 3 }}
      >
        Features of RecipeHub
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                padding: 3,
                textAlign: "center",
                backgroundColor: "#f9f9f9",
              }}
            >
              {feature.icon}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);

export default FeaturesSection;
