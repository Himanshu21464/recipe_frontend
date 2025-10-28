/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const UtensilSelect = ({ recipe, setRecipe, utensilOptions }) => {
  return (
    <FormControl fullWidth style={{ marginBottom: 20 }}>
      <InputLabel>Utensils</InputLabel>
      <Select
        multiple
        value={recipe.utensils}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, utensils: e.target.value }))
        }
        MenuProps={{
          PaperProps: { style: { maxHeight: 200, overflow: "auto" } },
        }}
      >
        {utensilOptions.map((u) => (
          <MenuItem key={u} value={u}>
            {u}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UtensilSelect;
