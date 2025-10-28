/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import RecipeTable from "./RecipeTable";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) fetchRecipes();
  }, [username]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`https://cgas.onrender.com/recipes/${username}`);
      setRecipes(response.data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setSnackbar({ open: true, message: "Failed to load recipes", severity: "error" });
    }
  };

  const handleCheckboxChange = (recipeId) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // ⚡ Optimistic Deletion for instant UI feedback
  const handleDeleteRecipes = async () => {
    if (selectedRecipes.length === 0) return;

    // Instantly remove from UI
    const remainingRecipes = recipes.filter(
      (r) => !selectedRecipes.includes(r.id)
    );
    setRecipes(remainingRecipes);
    setOpenDialog(false);
    setSelectedRecipes([]);

    // Non-blocking deletion in background
    setSnackbar({ open: true, message: "Deleting recipes...", severity: "info" });

    Promise.allSettled(
      selectedRecipes.map((id) =>
        axios.delete(`https://cgas.onrender.com/recipes/${id}`)
      )
    ).then((results) => {
      const failed = results.filter((r) => r.status === "rejected");

      if (failed.length === 0) {
        setSnackbar({ open: true, message: "✅ Recipes deleted successfully", severity: "success" });
      } else {
        setSnackbar({
          open: true,
          message: `⚠️ Some deletions failed (${failed.length})`,
          severity: "warning",
        });
        // Optionally refetch to ensure data consistency
        fetchRecipes();
      }
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Delete Recipes
      </Typography>

      {recipes.length > 0 ? (
        <RecipeTable
          recipes={recipes}
          selectedRecipes={selectedRecipes}
          onCheckboxChange={handleCheckboxChange}
        />
      ) : (
        <Typography sx={{ mt: 3 }}>No recipes found.</Typography>
      )}

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={() => setOpenDialog(true)}
        disabled={selectedRecipes.length === 0}
      >
        Delete Selected Recipes
      </Button>

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteRecipes}
      />

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeleteRecipe;
