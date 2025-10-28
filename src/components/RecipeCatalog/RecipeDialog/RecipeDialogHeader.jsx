import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const RecipeDialogHeader = ({ recipe, onClose }) => {
  return (
    <DialogTitle
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(90deg, #ffdfd0, #ffe6b5)",
        color: "#333",
        fontWeight: "bold",
        fontFamily: "'Poppins', sans-serif",
        py: 2,
      }}
    >
      {recipe?.name}
      <IconButton
        edge="end"
        onClick={onClose}
        sx={{
          color: "#333",
          "&:hover": { transform: "rotate(90deg)", transition: "0.3s" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};

export default RecipeDialogHeader;
