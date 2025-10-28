/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Slider,
  LinearProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useAuth } from "../../context/AuthContext";

import {
  ingredientsDictionary,
  conflicts,
  dietaryOptions,
  utensilOptions,
} from "./Ingredients";

import {
  generateFinalIngredientList,
  formatDuration,
} from "./utils";
import IngredientSection from "./IngredientSection";
import StepSection from "./StepSection";
import NutritionSection from "./NutritionSection";
import DietarySection from "./DietarySection";
import UtensilSelect from "./UtensilSelect";
import ImageUpload from "./ImageUpload";

const initialRecipeState = {
  name: "",
  ingredients: [{ name: "", quantity: "", unit: "Gram", form: "Fresh" }],
  steps: "",
  duration: 30,
  servings: 4,
  dietaryPreferences: [],
  calories: "",
  fat: "",
  carbohydrates: "",
  protein: "",
  image: null,
  finalIngredientList: "",
  utensils: [],
  likeCount: 0,
  dislikeCount: 0,
};

const RecipeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const { mode } = useThemeContext();

  const [recipe, setRecipe] = useState(initialRecipeState);
  const [steps, setSteps] = useState([""]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Auto-generate final ingredient list
  useEffect(() => {
    const finalList = generateFinalIngredientList(recipe.ingredients);
    setRecipe((prev) => ({ ...prev, finalIngredientList: finalList }));
  }, [recipe.ingredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setRecipe((prev) => ({ ...prev, image: compressed }));
      } catch (err) {
        console.error("Image compression failed:", err);
        setSnackbar({
          open: true,
          message: "Image compression failed",
          severity: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipe.name.trim() || !recipe.steps.trim() || !recipe.ingredients.length) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();

    let username = user?.username;
    if (!username) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      username = storedUser?.username || "UnknownUser";
    }

    Object.entries({
      name: recipe.name,
      username,
      steps: recipe.steps,
      duration: recipe.duration,
      servings: recipe.servings,
      calories: recipe.calories,
      fat: recipe.fat,
      carbohydrates: recipe.carbohydrates,
      protein: recipe.protein,
      dietaryPreferences: recipe.dietaryPreferences.join(", "),
      finalIngredientList: recipe.finalIngredientList,
    }).forEach(([key, val]) => formData.append(key, val));

    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    if (recipe.image) formData.append("image", recipe.image);

    try {
      setUploading(true);
      setUploadProgress(10);

      const response = await axios.post("https://cgas.onrender.com/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Recipe uploaded successfully!",
          severity: "success",
        });
        setRecipe(initialRecipeState);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Upload failed",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          mode === "light"
            ? `url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=2000&q=80")`
            : `url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2000&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 4,
      }}
    >
      {/* Frosted glass card */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 4,
          boxShadow:
            mode === "light"
              ? "0px 4px 30px rgba(0,0,0,0.2)"
              : "0px 4px 30px rgba(255,255,255,0.1)",
          backgroundColor:
            mode === "light"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(25, 25, 25, 0.6)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: `1px solid ${
            mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)"
          }`,
          transition: "0.3s ease-in-out",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: theme.palette.primary.main,
              letterSpacing: "0.5px",
            }}
          >
            Upload Your Recipe
          </Typography>

          <Divider sx={{ mb: 3, opacity: 0.5 }} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Recipe Name"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              size="small"
              variant="outlined"
            />

            <IngredientSection
              recipe={recipe}
              setRecipe={setRecipe}
              ingredientsDictionary={ingredientsDictionary}
            />

            <UtensilSelect
              recipe={recipe}
              setRecipe={setRecipe}
              utensilOptions={utensilOptions}
            />

            <DietarySection
              recipe={recipe}
              setRecipe={setRecipe}
              dietaryOptions={dietaryOptions}
              conflicts={conflicts}
            />

            <NutritionSection recipe={recipe} setRecipe={setRecipe} />

            <StepSection
              recipe={recipe}
              setRecipe={setRecipe}
              steps={steps}
              setSteps={setSteps}
            />

            <Typography gutterBottom sx={{ mt: 2, fontWeight: 500 }}>
              Preparation Time: {formatDuration(recipe.duration)}
            </Typography>
            <Slider
              value={recipe.duration}
              onChange={(_, val) =>
                setRecipe((prev) => ({ ...prev, duration: val }))
              }
              step={5}
              min={0}
              max={360}
              valueLabelDisplay="auto"
              valueLabelFormat={formatDuration}
              sx={{
                color: theme.palette.primary.main,
              }}
            />

            <TextField
              label="Servings (Max allowed: 10)"
              value={recipe.servings}
              onChange={(e) =>
                setRecipe((prev) => ({
                  ...prev,
                  servings: Math.max(
                    0,
                    Math.min(10, parseFloat(e.target.value))
                  ),
                }))
              }
              fullWidth
              margin="normal"
              type="number"
              size="small"
            />

            <ImageUpload handleImageChange={handleImageChange} />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={uploading}
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
              }}
            >
              {uploading ? "Uploading..." : "Submit Recipe"}
            </Button>

            {uploading && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 1, color: theme.palette.text.secondary }}
                >
                  {uploadProgress}% uploaded
                </Typography>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>

      {/* ✅ Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecipeForm;
