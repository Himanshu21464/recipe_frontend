/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DietarySection = ({ recipe, setRecipe, dietaryOptions, conflicts }) => {
  const handleDietaryChange = (e) => {
    const selected = e.target.value;
    let newPrefs = [...recipe.dietaryPreferences];

    if (conflicts[selected]) {
      conflicts[selected].forEach((conf) => {
        newPrefs = newPrefs.filter((p) => p !== conf);
      });
    }
    newPrefs = [selected];

    setRecipe((prev) => ({ ...prev, dietaryPreferences: newPrefs }));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Dietary Preference</h3>
      <FormControl fullWidth>
        <InputLabel>Dietary Preference</InputLabel>
        <Select
          value={recipe.dietaryPreferences[0] || ""}
          onChange={handleDietaryChange}
        >
          {dietaryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DietarySection;
