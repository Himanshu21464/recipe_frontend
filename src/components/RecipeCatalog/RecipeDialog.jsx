/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import moment from "moment";

const RecipeDialog = ({ open, onClose, recipe, onLike, onDislike }) => {
  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{recipe?.name}</Typography>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Recipe Image */}
          <CardMedia
            component="img"
            height="300"
            image={recipe?.imageUrl}
            alt={recipe?.name}
            sx={{ borderRadius: 2 }}
          />

          {/* Recipe Information Section */}
          <Box
            sx={{
              width: "100%",
              marginTop: 2,
              backgroundColor: "#e0f7fa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recipe Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Ingredients:</strong> {recipe?.allIngredients}{" "}
                  minutes
                </Typography>

                <Typography variant="body1">
                  <strong>Utensils:</strong> {recipe?.utensils || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {recipe?.duration} minutes
                </Typography>
                <Typography variant="body1">
                  <strong>Servings:</strong> {recipe?.servings}
                </Typography>
                <Typography variant="body1">
                  <strong>Dietary Preferences:</strong>{" "}
                  {recipe?.dietaryPreferences || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          {/* Preparation Steps Section */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#e0f7fa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Preparation Steps
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {recipe?.steps?.split("|").map((step, index) => (
                  <Typography key={index} variant="body1">
                    <strong></strong> {step.trim()}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          {/* Nutritional Values Section */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#e0f7fa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Nutritional Values
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="body1">
                  <strong>Calories:</strong> {recipe?.calories} kcal
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body1">
                  <strong>Fat:</strong> {recipe?.fat} g
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body1">
                  <strong>Carbohydrates:</strong>{" "}
                  {recipe?.carbohydrates} g
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body1">
                  <strong>Protein:</strong> {recipe?.protein} g
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          {/* Upload Details Section */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#e0f7fa",
              padding: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Details
            </Typography>
            <Typography variant="body1">
              <strong>Upload Date:</strong>{" "}
              {moment(recipe?.uploadDate).format(
                "MMMM Do YYYY, h:mm A"
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Uploaded By:</strong> {recipe?.username}
            </Typography>
            <Typography variant="body1">
              <strong>Likes:</strong> {recipe?.likeCount || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Flagged as inappropriate:</strong>{" "}
              {recipe?.dislikeCount || "N/A"}
            </Typography>
          </Box>

          {/* Like and Dislike Buttons Section */}

        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
