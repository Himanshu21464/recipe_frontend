/* eslint-disable react/prop-types */
// src/components/Recipes/DeleteRecipe/RecipeTable.jsx
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Checkbox,
} from "@mui/material";

const RecipeTable = ({ recipes, selectedRecipes, onCheckboxChange }) => {
  if (!recipes?.length) return null;

  return (
    <TableContainer sx={{ marginTop: 3 }}>
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
                  onChange={() => onCheckboxChange(recipe.id)}
                />
              </TableCell>
              <TableCell>{recipe.name}</TableCell>
              <TableCell>{recipe.ingredients}</TableCell>
              <TableCell>{recipe.steps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecipeTable;
