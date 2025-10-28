// src/components/RecipeCatalog/api.js
export const fetchRecipes = async () => {
  const response = await fetch("https://cgas.onrender.com/recipes/");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch recipes");
  return data.recipes;
};

export const likeRecipe = async (recipeId, username) => {
  const response = await fetch("https://cgas.onrender.com/recipes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId, username }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to like recipe");
  return data;
};

export const dislikeRecipe = async (recipeId, username) => {
  const response = await fetch("https://cgas.onrender.com/recipes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId, username }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to dislike recipe");
  return data;
};
