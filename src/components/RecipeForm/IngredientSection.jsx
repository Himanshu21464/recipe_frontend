/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  CircularProgress, // ✅ Correct import
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientSection = ({ recipe, setRecipe, ingredientsDictionary }) => {
  const [isLoading, setIsLoading] = useState(false);
  const ingredientForms = ["Fresh", "Dried", "Frozen", "Canned", "Powdered", "Chopped", "Whole"];
  const quantityUnits = ["Gram", "Milliliter", "Ounce", "Tablespoon", "Teaspoon", "Cup"];

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Ingredients</h3>

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <CircularProgress size={24} /> {/* ✅ MUI’s proper loader */}
        </div>
      )}

      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} style={{ display: "flex", marginBottom: 10, alignItems: "center" }}>
          <Typeahead
            id={`ingredients-typeahead-${index}`}
            labelKey="name"
            options={ingredientsDictionary}
            required
            placeholder="Choose ingredients..."
            onChange={(selected) => {
              const newIngredients = [...recipe.ingredients];
              newIngredients[index].name = selected[0]?.name || "";
              setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
            }}
            onSearch={handleSearch}
            selected={ingredient.name ? [{ name: ingredient.name }] : []}
          />

          <TextField
            label="Quantity"
            value={ingredient.quantity}
            required
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === "" || Number(inputValue) >= 0) {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].quantity = inputValue;
                setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
              }
            }}
            type="number"
            size="small"
            style={{ marginLeft: 10, width: "15%" }}
          />

          <FormControl style={{ marginLeft: 10, width: "20%" }}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={ingredient.unit}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].unit = e.target.value;
                setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
              }}
            >
              {quantityUnits.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ marginLeft: 10, width: "20%" }}>
            <InputLabel>Form</InputLabel>
            <Select
              value={ingredient.form}
              onChange={(e) => {
                const newIngredients = [...recipe.ingredients];
                newIngredients[index].form = e.target.value;
                setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
              }}
            >
              {ingredientForms.map((form) => (
                <MenuItem key={form} value={form}>
                  {form}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {index > 0 && (
            <IconButton
              color="error"
              onClick={() => {
                const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
                setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      ))}

      <Button
        variant="contained"
        onClick={() =>
          setRecipe((prev) => ({
            ...prev,
            ingredients: [
              ...prev.ingredients,
              { name: "", quantity: "", unit: "Gram", form: "Fresh" },
            ],
          }))
        }
      >
        + Add Ingredient
      </Button>
    </div>
  );
};

export default IngredientSection;
