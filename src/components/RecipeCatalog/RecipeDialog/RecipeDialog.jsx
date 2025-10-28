/* eslint-disable react/prop-types */
import React from "react";
import { Dialog, useTheme } from "@mui/material";
import RecipeDialogHeader from "./RecipeDialogHeader";
import RecipeDialogContent from "./RecipeDialogContent";
import { useAuth } from "../../../context/AuthContext"; // ✅ import useAuth

const RecipeDialog = ({ open, onClose, recipe, onLike, onDislike }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { user } = useAuth(); // ✅ access logged-in user

  if (!recipe) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          background: isLight
            ? "linear-gradient(135deg, #fffaf5, #fff)"
            : "linear-gradient(135deg, #1e1e1e, #2c2c2c)",
          backdropFilter: "blur(8px)",
          boxShadow: isLight
            ? "0 8px 24px rgba(0,0,0,0.15)"
            : "0 8px 24px rgba(255,255,255,0.1)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <RecipeDialogHeader recipe={recipe} onClose={onClose} />

      <RecipeDialogContent
        recipe={recipe}
        // ✅ Only pass like/dislike handlers if user is logged in
        onLike={user ? onLike : null}
        onDislike={user ? onDislike : null}
      />
    </Dialog>
  );
};

export default RecipeDialog;
