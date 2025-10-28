/* eslint-disable no-unused-vars */
// src/components/HomePage/HeaderSection.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../../assets/background.jpg";

const HeaderSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        color: "white",
        textAlign: "center",
        padding: { xs: "40px 20px", md: "60px 20px" },
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Welcome to RecipeHub
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto",
            marginBottom: 4,
          }}
        >
          Your one-stop platform to collect, manage, and share your favorite
          recipes effortlessly. Join our community and explore new culinary
          adventures!
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderSection;
