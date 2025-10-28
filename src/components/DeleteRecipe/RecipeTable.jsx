/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";

const RecipeTable = ({ recipes, selectedRecipes, onCheckboxChange }) => {
  return (
    <TableContainer sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Image</TableCell>
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
                  onChange={() => onCheckboxChange(recipe.id)}
                />
              </TableCell>

              <TableCell>
                <Box
                  component="img"
                  src={recipe.image || recipe.imageUrl || "/default-recipe.jpg"}
                  alt={recipe.name}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
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
                  <Typography variant="body2">{recipe.ingredients}</Typography>
                )}
              </TableCell>

              <TableCell>
                {Array.isArray(recipe.steps) ? (
                  <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
                    {recipe.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <Typography variant="body2">{recipe.steps}</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecipeTable;
