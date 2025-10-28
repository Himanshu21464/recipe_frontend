/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { TextField } from "@mui/material";

const NutritionSection = ({ recipe, setRecipe }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Nutritional Information</h3>
      {[
        { name: "calories", label: "Calories (Max 3000)", max: 3000 },
        { name: "fat", label: "Fat (Max 200g)", max: 200 },
        { name: "carbohydrates", label: "Carbohydrates (Max 300g)", max: 300 },
        { name: "protein", label: "Protein (Max 200g)", max: 200 },
      ].map(({ name, label, max }) => (
        <TextField
          key={name}
          label={label}
          name={name}
          value={recipe[name]}
          required
          onChange={(e) => {
            const val = Math.max(0, Math.min(max, parseFloat(e.target.value)));
            setRecipe((prev) => ({ ...prev, [name]: val }));
          }}
          type="number"
          fullWidth
          margin="normal"
          size="small"
        />
      ))}
    </div>
  );
};

export default NutritionSection;
