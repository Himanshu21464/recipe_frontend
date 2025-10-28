/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Grid,
  CardMedia,
  Button,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import moment from "moment";

const RecipeDialog = ({ open, onClose, recipe, onLike, onDislike }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          background: isLight
            ? "linear-gradient(135deg, #fffaf5, #fff)"
            : "linear-gradient(135deg, #1e1e1e, #2c2c2c)",
          backdropFilter: "blur(8px)",
          boxShadow: isLight
            ? "0 8px 24px rgba(0,0,0,0.15)"
            : "0 8px 24px rgba(255,255,255,0.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: isLight
            ? "linear-gradient(90deg, #ffdfd0, #ffe6b5)"
            : "linear-gradient(90deg, #2c2c2c, #3a3a3a)",
          color: isLight ? "#333" : "#fff",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          py: 2,
        }}
      >
        {recipe?.name}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{
            color: isLight ? "#333" : "#fff",
            "&:hover": { transform: "rotate(90deg)", transition: "0.3s" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 🥗 Recipe Image */}
          <CardMedia
            component="img"
            height="300"
            image={recipe?.imageUrl}
            alt={recipe?.name}
            sx={{
              borderRadius: 3,
              objectFit: "cover",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              mb: 3,
            }}
          />

          {/* 🍽️ Info Section */}
          <GlassSection title="Recipe Information">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* Ingredients */}
                <Info
                  label="Ingredients"
                  value={
                    recipe?.ingredients?.length > 0
                      ? recipe.ingredients
                          .map((i) =>
                            `${i.quantity || ""} ${i.unit || ""} ${
                              i.form || ""
                            } ${i.name || ""}`.trim()
                          )
                          .join(", ")
                      : recipe?.finalIngredientList || "N/A"
                  }
                />

                {/* Utensils */}
                <Info
                  label="Utensils"
                  value={
                    Array.isArray(recipe?.utensils) &&
                    recipe.utensils.length > 0
                      ? recipe.utensils.join(", ")
                      : "N/A"
                  }
                />

                {/* Other Info */}
                <Info label="Duration" value={`${recipe?.duration} minutes`} />
                <Info label="Servings" value={recipe?.servings} />
                <Info
                  label="Dietary Preferences"
                  value={recipe?.dietaryPreferences || "N/A"}
                />
              </Grid>
            </Grid>
          </GlassSection>

          <Divider sx={{ my: 3, width: "100%" }} />

          {/* 🧾 Steps */}
          <GlassSection title="Preparation Steps">
            {recipe?.steps?.split("|").map((step, i) => (
              <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                {i + 1}. {step.trim()}
              </Typography>
            ))}
          </GlassSection>

          <Divider sx={{ my: 3, width: "100%" }} />

          {/* ⚡ Nutrition */}
          <GlassSection title="Nutritional Values">
            <Grid container spacing={2}>
              <Nutrition label="Calories" value={`${recipe?.calories} kcal`} />
              <Nutrition label="Fat" value={`${recipe?.fat} g`} />
              <Nutrition
                label="Carbohydrates"
                value={`${recipe?.carbohydrates} g`}
              />
              <Nutrition label="Protein" value={`${recipe?.protein} g`} />
            </Grid>
          </GlassSection>

          <Divider sx={{ my: 3, width: "100%" }} />

          {/* 👤 Upload Details */}
          <GlassSection title="Upload Details">
            <Info
              label="Upload Date"
              value={moment(recipe?.uploadDate).format("MMMM Do YYYY, h:mm A")}
            />
            <Info label="Uploaded By" value={recipe?.username} />
            <Info label="Likes" value={recipe?.likeCount || 0} />
            <Info
              label="Flagged as Inappropriate"
              value={recipe?.dislikeCount || 0}
            />
          </GlassSection>

          <Divider sx={{ my: 3, width: "100%" }} />

          {/* ❤️ Like / Dislike */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ThumbUpAltRoundedIcon />}
              onClick={onLike}
              sx={{
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(90deg, #ff7043, #ffa726)",
                "&:hover": {
                  background: "linear-gradient(90deg, #ff5722, #ff9800)",
                },
              }}
            >
              Like
            </Button>

            <Button
              variant="outlined"
              startIcon={<ThumbDownAltRoundedIcon />}
              onClick={onDislike}
              sx={{
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                color: isLight ? "#ff3d00" : "#ff7043",
                borderColor: isLight ? "#ff3d00" : "#ff7043",
                "&:hover": {
                  backgroundColor: isLight ? "#fff1ee" : "#2c2c2c",
                  borderColor: "#ff5722",
                },
              }}
            >
              Dislike
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// 🧊 Small reusable section with glassmorphism style
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

// 🧾 Info row
const Info = ({ label, value }) => (
  <Typography variant="body1" sx={{ mb: 0.8 }}>
    <strong>{label}:</strong> {value}
  </Typography>
);

// 🍎 Nutrition item
const Nutrition = ({ label, value }) => (
  <Grid item xs={6} sm={3}>
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {label}:
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.9 }}>
      {value}
    </Typography>
  </Grid>
);

export default RecipeDialog;
