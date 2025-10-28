/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  DialogContent,
  Box,
  Divider,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import GlassSection from "./GlassSection";
import InfoRow from "./InfoRow";
import NutritionItem from "./NutritionItem";
import LikeDislikeButtons from "./LikeDislikeButtons";
import { useAuth } from "../../../context/AuthContext"; // ✅ import auth context

const RecipeDialogContent = ({ recipe }) => {
  const { user } = useAuth(); // ✅ logged-in user
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  // ✅ Handle Like
  const handleLike = async () => {
    if (!user) return;
    try {
      setIsLiking(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${currentRecipe.id}/like`
      );
      setCurrentRecipe(res.data.recipe);
    } catch (err) {
      console.error("Error liking recipe:", err);
    } finally {
      setIsLiking(false);
    }
  };

  // ✅ Handle Dislike
  const handleDislike = async () => {
    if (!user) return;
    try {
      setIsDisliking(true);
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${currentRecipe.id}/dislike`
      );
      setCurrentRecipe(res.data.recipe);
    } catch (err) {
      console.error("Error disliking recipe:", err);
    } finally {
      setIsDisliking(false);
    }
  };

  if (!currentRecipe) return null;

  return (
    <DialogContent sx={{ p: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* 🥗 Image */}
        {currentRecipe.imageUrl && (
          <CardMedia
            component="img"
            height="300"
            image={currentRecipe.imageUrl}
            alt={currentRecipe.name}
            sx={{
              borderRadius: 3,
              objectFit: "cover",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              mb: 3,
            }}
          />
        )}

        {/* 🍽️ Info Section */}
        <GlassSection title="Recipe Information">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InfoRow
                label="Ingredients"
                value={
                  currentRecipe?.ingredients?.length > 0
                    ? currentRecipe.ingredients
                        .map(
                          (i) =>
                            `${i.quantity || ""} ${i.unit || ""} ${
                              i.form || ""
                            } ${i.name || ""}`.trim()
                        )
                        .join(", ")
                    : currentRecipe?.finalIngredientList || "N/A"
                }
              />
              <InfoRow
                label="Utensils"
                value={
                  Array.isArray(currentRecipe?.utensils) &&
                  currentRecipe.utensils.length > 0
                    ? currentRecipe.utensils.join(", ")
                    : "N/A"
                }
              />
              <InfoRow
                label="Duration"
                value={
                  currentRecipe?.duration
                    ? `${currentRecipe.duration} minutes`
                    : "N/A"
                }
              />
              <InfoRow
                label="Servings"
                value={currentRecipe?.servings || "N/A"}
              />
              <InfoRow
                label="Dietary Preferences"
                value={currentRecipe?.dietaryPreferences || "N/A"}
              />
            </Grid>
          </Grid>
        </GlassSection>

        <Divider sx={{ my: 3, width: "100%" }} />

        {/* 🧾 Steps */}
        <GlassSection title="Preparation Steps">
          {currentRecipe?.steps
            ?.split("|")
            .map((step, i) => (
              <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                {i + 1}. {step.trim()}
              </Typography>
            ))}
        </GlassSection>

        <Divider sx={{ my: 3, width: "100%" }} />

        {/* ⚡ Nutrition */}
        <GlassSection title="Nutritional Values">
          <Grid container spacing={2}>
            <NutritionItem
              label="Calories"
              value={
                currentRecipe?.calories
                  ? `${currentRecipe.calories} kcal`
                  : "N/A"
              }
            />
            <NutritionItem
              label="Fat"
              value={
                currentRecipe?.fat ? `${currentRecipe.fat} g` : "N/A"
              }
            />
            <NutritionItem
              label="Carbohydrates"
              value={
                currentRecipe?.carbohydrates
                  ? `${currentRecipe.carbohydrates} g`
                  : "N/A"
              }
            />
            <NutritionItem
              label="Protein"
              value={
                currentRecipe?.protein
                  ? `${currentRecipe.protein} g`
                  : "N/A"
              }
            />
          </Grid>
        </GlassSection>

        <Divider sx={{ my: 3, width: "100%" }} />

        {/* 👤 Upload Details */}
        <GlassSection title="Upload Details">
          <InfoRow
            label="Upload Date"
            value={moment(currentRecipe?.uploadDate).format(
              "MMMM Do YYYY, h:mm A"
            )}
          />
          <InfoRow label="Uploaded By" value={currentRecipe?.username} />
          {/* <InfoRow
            label="Likes"
            value={currentRecipe?.likeCount || 0}
          />
          <InfoRow
            label="Flagged as Inappropriate"
            value={currentRecipe?.dislikeCount || 0}
          /> */}
        </GlassSection>

        <Divider sx={{ my: 3, width: "100%" }} />

        {/* 👍👎 Like/Dislike (Only for logged-in users)
        {user ? (
          <LikeDislikeButtons
            onLike={handleLike}
            onDislike={handleDislike}
            disabled={isLiking || isDisliking}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, fontStyle: "italic" }}
          >
            Please log in to like or dislike this recipe.
          </Typography>
        )} */}
      </Box>
    </DialogContent>
  );
};

export default RecipeDialogContent;
