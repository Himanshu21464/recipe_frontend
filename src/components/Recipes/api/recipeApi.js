// src/components/Recipes/api/recipeApi.js
import axios from "axios";

const BASE_URL = "https://cgas.onrender.com";

export const fetchUserRecipes = async (username) => {
  const response = await axios.get(`${BASE_URL}/recipes/${username}`);
  return response.data.recipes;
};

export const deleteUserRecipes = async (username, recipeIds) => {
  return await axios.delete(`${BASE_URL}/recipes/${username}`, {
    data: { recipeIds },
  });
};
