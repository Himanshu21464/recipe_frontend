/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Slider,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import imageCompression from "browser-image-compression";

import {
  ingredientsDictionary,
  conflicts,
  dietaryOptions,
  utensilOptions,
} from "./Ingredients";

import { generateFinalIngredientList, formatDuration } from "./utils";
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

  const [recipe, setRecipe] = useState(initialRecipeState);
  const [steps, setSteps] = useState([""]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Auto-generate final ingredient list
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
        // ✅ Compress the image before uploading
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        setRecipe((prev) => ({ ...prev, image: compressed }));
      } catch (err) {
        console.error("Image compression failed:", err);
        setSnackbar({ open: true, message: "Image compression failed", severity: "error" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!recipe.name.trim() || !recipe.steps.trim() || !recipe.ingredients.length) {
      setSnackbar({ open: true, message: "Please fill all required fields", severity: "error" });
      return;
    }

    const formData = new FormData();
    const username = localStorage.getItem("username");

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
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      if (response.status === 200) {
        setSnackbar({ open: true, message: "Recipe uploaded successfully!", severity: "success" });
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
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        background: "#f4f4f4",
        borderRadius: 12,
      }}
    >
      <h2 style={{ textAlign: "center" }}>Upload Recipe</h2>

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

        <StepSection recipe={recipe} setRecipe={setRecipe} steps={steps} setSteps={setSteps} />

        <Typography gutterBottom>
          Preparation Time: {formatDuration(recipe.duration)}
        </Typography>
        <Slider
          value={recipe.duration}
          onChange={(_, val) => setRecipe((prev) => ({ ...prev, duration: val }))}
          step={5}
          min={0}
          max={360}
          valueLabelDisplay="auto"
          valueLabelFormat={formatDuration}
        />

        <TextField
          label="Servings (Max allowed: 10)"
          value={recipe.servings}
          onChange={(e) =>
            setRecipe((prev) => ({
              ...prev,
              servings: Math.max(0, Math.min(10, parseFloat(e.target.value))),
            }))
          }
          fullWidth
          margin="normal"
          type="number"
          size="small"
        />

        <ImageUpload handleImageChange={handleImageChange} />

        <Button type="submit" variant="contained" fullWidth disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Recipe"}
        </Button>

        {uploading && (
          <div style={{ marginTop: 15 }}>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ marginTop: 1 }}
            >
              {uploadProgress}% uploaded
            </Typography>
          </div>
        )}
      </form>

      {/* ✅ Snackbar for success/error messages */}
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
    </div>
  );
};

export default RecipeForm;
