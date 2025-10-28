/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";

const DeleteRecipe = () => {
  const [recipes, setRecipes] = useState([]); // Store user's recipes
  const [selectedRecipes, setSelectedRecipes] = useState([]); // Recipes to delete
  const [openDialog, setOpenDialog] = useState(false);

  // Get current logged-in username from localStorage
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      fetchRecipes();
    }
  }, [username]);

  // Fetch user's recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://cgas.onrender.com/recipes/${username}`
      );
      setRecipes(response.data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Handle checkbox select/deselect
  const handleCheckboxChange = (recipeId) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId]
    );
  };

  // Delete selected recipes
const handleDeleteRecipes = async () => {
  try {
    await Promise.all(
      selectedRecipes.map((id) =>
        axios.delete(`https://cgas.onrender.com/recipes/${id}`)
      )
    );
    alert("Recipes deleted successfully");
    setRecipes((prev) => prev.filter((r) => !selectedRecipes.includes(r.id)));
    setSelectedRecipes([]);
    setOpenDialog(false);
  } catch (error) {
    console.error("Error deleting recipes:", error);
  }
};


  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Delete Recipes
      </Typography>

      {/* Recipes Table */}
      {recipes.length > 0 ? (
        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Recipe Name</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Steps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRecipes.includes(recipe.id)}
                      onChange={() => handleCheckboxChange(recipe.id)}
                    />
                  </TableCell>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>
                    {Array.isArray(recipe.ingredients) ? (
                      recipe.ingredients.map((ing, i) => (
                        <div key={i}>
                          {ing.name} — {ing.quantity} {ing.unit} ({ing.form})
                        </div>
                      ))
                    ) : (
                      <div>{recipe.ingredients}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {Array.isArray(recipe.steps) ? (
                      <ol>
                        {recipe.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <div>{recipe.steps}</div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ mt: 3 }}>No recipes found.</Typography>
      )}

      {/* Delete Button */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={() => setOpenDialog(true)}
        disabled={selectedRecipes.length === 0}
      >
        Delete Selected Recipes
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the selected recipes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteRecipes} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteRecipe;
