/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const RecipeCard = ({ recipe, onClick }) => (
  <Card
    sx={{
      maxWidth: 345,
      borderRadius: 2,
      boxShadow: 3,
      transition: "0.3s",
      "&:hover": { transform: "scale(1.05)" },
    }}
    onClick={() => onClick(recipe)}
  >
    <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.name} />
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {recipe.name}
      </Typography>
      <Typography variant="body2">Uploaded By: {recipe.username}</Typography>
      <Box>
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

export default RecipeCard;
