// src/components/HomePage/data.js
import { Person, AddCircle, Explore, Star, Share } from "@mui/icons-material";

export const howToUseSteps = [
  {
    icon: <Person sx={{ fontSize: 50, color: "#4CAF50", marginBottom: 2 }} />,
    title: "Step 1: Create an Account",
    description:
      "Sign up for a free account to start uploading and managing your recipes.",
  },
  {
    icon: <AddCircle sx={{ fontSize: 50, color: "#FF9800", marginBottom: 2 }} />,
    title: "Step 2: Add Your Recipes",
    description:
      "Upload your favorite recipes, complete with ingredients and preparation steps.",
  },
  {
    icon: <Explore sx={{ fontSize: 50, color: "#2196F3", marginBottom: 2 }} />,
    title: "Step 3: Explore and Share",
    description:
      "Browse recipes shared by others and save your favorites to try later.",
  },
];

export const features = [
  {
    icon: <Star sx={{ fontSize: 50, color: "#FFC107", marginBottom: 2 }} />,
    title: "Personalized Profiles",
    description:
      "Create a profile to store and manage all your recipes, track favorites, and share with others.",
  },
  {
    icon: <Explore sx={{ fontSize: 50, color: "#2196F3", marginBottom: 2 }} />,
    title: "Search Recipes",
    description:
      "Search and filter recipes by ingredients, cuisine, or preparation time.",
  },
  {
    icon: <Share sx={{ fontSize: 50, color: "#4CAF50", marginBottom: 2 }} />,
    title: "Community Sharing",
    description:
      "Share your recipes with the community and explore others’ culinary creations and ideas.",
  },
];
