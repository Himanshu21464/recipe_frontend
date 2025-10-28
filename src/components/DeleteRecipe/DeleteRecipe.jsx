/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  Paper,
} from "@mui/material";
import axios from "axios";
import RecipeTable from "./RecipeTable";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useAuth } from "../../context/AuthContext";

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const theme = useTheme(); // ✅ Access current theme (light/dark)
  const { user } = useAuth();
  const username = user?.username || localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (username) fetchRecipes();
  }, [username]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://cgas.onrender.com/recipes/${username}`,
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}
      );
      setRecipes(response.data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setSnackbar({
        open: true,
        message: "Failed to load recipes",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (recipeId) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleDeleteRecipes = async () => {
    if (selectedRecipes.length === 0) return;

    const remainingRecipes = recipes.filter(
      (r) => !selectedRecipes.includes(r.id)
    );
    setRecipes(remainingRecipes);
    setOpenDialog(false);
    setSelectedRecipes([]);

    setSnackbar({
      open: true,
      message: "Deleting recipes...",
      severity: "info",
    });

    Promise.allSettled(
      selectedRecipes.map((id) =>
        axios.delete(`https://cgas.onrender.com/recipes/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
      )
    ).then((results) => {
      const failed = results.filter((r) => r.status === "rejected");

      if (failed.length === 0) {
        setSnackbar({
          open: true,
          message: "✅ Recipes deleted successfully",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: `⚠️ Some deletions failed (${failed.length})`,
          severity: "warning",
        });
        fetchRecipes(); // refresh if some failed
      }
    });
  };

  return (
    <Box
      sx={{
        padding: 3,
        minHeight: "100vh",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.background.default
            : theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.background.paper
              : "#1e1e1e",
          padding: 3,
          borderRadius: 2,
          border: `2px solid ${
            theme.palette.mode === "light"
              ? theme.palette.primary.light
              : theme.palette.secondary.dark
          }`,
          transition: "all 0.3s ease",
        }}
      >
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
          <Typography sx={{ mt: 3 }}>
            {username
              ? "No recipes found."
              : "Please log in to view your recipes."}
          </Typography>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: 3,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.light,
            },
          }}
          onClick={() => setOpenDialog(true)}
          disabled={selectedRecipes.length === 0}
        >
          Delete Selected Recipes
        </Button>
      </Paper>

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteRecipes}
      />

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
