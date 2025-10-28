/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, useTheme } from "@mui/material";

const RecipeCard = ({ recipe, onClick }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: theme.palette.mode === "light"
          ? "0 4px 10px rgba(0,0,0,0.1)"
          : "0 4px 12px rgba(255,255,255,0.1)",
        border: `2px solid ${
          theme.palette.mode === "light"
            ? "0 4px 10px rgba(72, 143, 194, 0.1)"
            : "0 4px 10px rgba(85, 128, 235, 0.1)"
        }`,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.background.default,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 6px 16px rgba(0,0,0,0.2)"
              : "0 6px 18px rgba(255,255,255,0.15)",
          border: `2px solid ${
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.secondary.light
          }`,
        },
      }}
      onClick={() => onClick(recipe)}
    >
      {recipe.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={recipe.imageUrl}
          alt={recipe.name}
        />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Uploaded By: {recipe.username}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <strong>Servings:</strong> {recipe.servings}
          </Typography>
          <Typography variant="body2">
            <strong>Dietary:</strong> {recipe.dietaryPreferences || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Likes:</strong> {recipe.likeCount || 0}
          </Typography>
          <Typography variant="body2">
            <strong>Dislikes:</strong> {recipe.dislikeCount || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
