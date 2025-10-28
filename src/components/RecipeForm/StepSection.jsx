/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, TextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const StepSection = ({ recipe, setRecipe, steps, setSteps }) => {
  const handleStepChange = (index, e) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);

    const separator = "|";
    const stepsWithLabels = newSteps
      .map((s, idx) => `Step ${idx + 1}: ${s}`)
      .join(` ${separator} `);

    setRecipe((prev) => ({ ...prev, steps: stepsWithLabels }));
  };

  const handleAddStep = () => setSteps([...steps, ""]);
  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    setRecipe((prev) => ({ ...prev, steps: newSteps.join("\n") }));
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>Steps To Prepare Recipe</h3>
      {steps.map((step, i) => (
        <Box key={i} mb={2} display="flex" alignItems="center">
          <TextField
            label={`Step ${i + 1}`}
            value={step}
            onChange={(e) => handleStepChange(i, e)}
            required
            fullWidth
            multiline
            rows={2}
          />
          <IconButton color="error" onClick={() => handleRemoveStep(i)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="outlined" onClick={handleAddStep}>
        Add Step
      </Button>
    </div>
  );
};

export default StepSection;
