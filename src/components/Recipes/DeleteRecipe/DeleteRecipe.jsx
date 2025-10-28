/* eslint-disable no-unused-vars */
// src/components/Recipes/DeleteRecipe/DeleteRecipe.jsx
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import RecipeTable from "./RecipeTable";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { fetchUserRecipes, deleteUserRecipes } from "../api/recipeApi";

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) loadRecipes();
  }, [username]);

  const loadRecipes = async () => {
    try {
      const data = await fetchUserRecipes(username);
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleCheckboxChange = (recipeId) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleDelete = async () => {
    try {
      await deleteUserRecipes(username, selectedRecipes);
      setOpenDialog(false);
      alert("Recipes deleted successfully");
      setRecipes((prev) =>
        prev.filter((recipe) => !selectedRecipes.includes(recipe.id))
      );
      setSelectedRecipes([]);
    } catch (error) {
      console.error("Error deleting recipes:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <RecipeTable
        recipes={recipes}
        selectedRecipes={selectedRecipes}
        onCheckboxChange={handleCheckboxChange}
      />

      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 3 }}
        disabled={selectedRecipes.length === 0}
        onClick={() => setOpenDialog(true)}
      >
        Delete Selected Recipes
      </Button>

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default DeleteRecipe;
