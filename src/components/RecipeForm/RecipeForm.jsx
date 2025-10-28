/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Slider,
  LinearProgress,
} from "@mui/material";
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

const RecipeForm = () => {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
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
  });

  const [steps, setSteps] = useState([""]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false); // ✅ New: to track upload status
  const [uploadProgress, setUploadProgress] = useState(0); // ✅ New: for progress bar

  // Auto-generate final ingredient list
  useEffect(() => {
    const finalList = generateFinalIngredientList(recipe.ingredients);
    setRecipe((prev) => ({ ...prev, finalIngredientList: finalList }));
  }, [recipe.ingredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setUploadProgress(20); // show initial progress

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://cgas.onrender.com/upload", true);

      // ✅ track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          alert("Recipe uploaded successfully!");
          setMessage("Recipe uploaded successfully!");
          setRecipe({
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
          });
          setUploadProgress(0);
        } else {
          const err = JSON.parse(xhr.responseText);
          setMessage(`Error: ${err.message || "Upload failed"}`);
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setMessage("Error: Failed to connect to server");
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      setMessage(`Error: ${error.message}`);
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
      {message && (
        <p
          style={{
            color: message.includes("Error") ? "red" : "green",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

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

        <ImageUpload
          handleImageChange={(e) =>
            setRecipe((prev) => ({ ...prev, image: e.target.files[0] }))
          }
        />

        <Button type="submit" variant="contained" fullWidth disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Recipe"}
        </Button>

        {/* ✅ Progress Bar */}
        {uploading && (
          <div style={{ marginTop: 15 }}>
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
              color="textSecondary"
              align="center"
              sx={{ marginTop: 1 }}
            >
              {uploadProgress}% uploaded
            </Typography>
          </div>
        )}
      </form>
    </div>
  );
};

export default RecipeForm;
