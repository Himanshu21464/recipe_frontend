/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, AppBar, Toolbar, Box } from "@mui/material";
import FilterPanel from "./FilterPanel";
import RecipeCard from "./RecipeCard";
import RecipeDialog from "./RecipeDialog";
import { fetchRecipes, likeRecipe, dislikeRecipe } from "./api";

const RecipeCatalog = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [timeRange, setTimeRange] = useState([0, 360]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState([]);
  const [searchByUser, setSearchByUser] = useState("");
  const [selectedServings, setSelectedServings] = useState([1, 10]);
  const [allIngredients, setAllIngredients] = useState([]);

  // ✅ Load all recipes once
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);

        // Collect all unique ingredient names for filter dropdown
        const ingredients = new Set();
        data.forEach((r) => {
          if (Array.isArray(r.ingredients)) {
            r.ingredients.forEach((ing) => ingredients.add(ing.name?.trim().toLowerCase()));
          } else if (typeof r.ingredients === "string") {
            r.ingredients.split(",").forEach((ing) => ingredients.add(ing.trim().toLowerCase()));
          }
        });

        setAllIngredients([...ingredients]);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  // ✅ Fixed Search Logic
  const handleSearch = () => {
    const filtered = recipes.filter((recipe) => {
      const matchesName = recipe.name?.toLowerCase().includes(searchName.toLowerCase());
      const matchesUser = recipe.username?.toLowerCase().includes(searchByUser.toLowerCase());

      // Extract ingredient names safely
      const recipeIngredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.map((ing) => ing.name?.toLowerCase().trim())
        : (recipe.ingredients || "")
            .toString()
            .toLowerCase()
            .split(",")
            .map((i) => i.trim());

      const matchesIngredients = selectedIngredients.every((ing) =>
        recipeIngredients.includes(ing.toLowerCase())
      );

      const matchesTime =
        recipe.duration >= timeRange[0] && recipe.duration <= timeRange[1];

      const matchesServings =
        recipe.servings >= selectedServings[0] &&
        recipe.servings <= selectedServings[1];

      const matchesDiet = selectedDietaryPreferences.every((pref) =>
        recipe.dietaryPreferences
          ?.toString()
          .toLowerCase()
          .includes(pref.toLowerCase())
      );

      return (
        matchesName &&
        matchesUser &&
        matchesIngredients &&
        matchesTime &&
        matchesServings &&
        matchesDiet
      );
    });

    setFilteredRecipes(filtered);
  };

  // ✅ Reset Filters
  const handleReset = () => {
    setSearchName("");
    setSelectedIngredients([]);
    setTimeRange([0, 360]);
    setSearchByUser("");
    setSelectedDietaryPreferences([]);
    setSelectedServings([1, 10]);
    setFilteredRecipes(recipes);
  };

  // ✅ Like Recipe
  const handleLike = async (recipe) => {
    await likeRecipe(recipe.id, recipe.username);
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipe.id ? { ...r, likeCount: (r.likeCount || 0) + 1 } : r
      )
    );
  };

  // ✅ Dislike Recipe
  const handleDislike = async (recipe) => {
    await dislikeRecipe(recipe.id, recipe.username);
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipe.id ? { ...r, dislikeCount: (r.dislikeCount || 0) + 1 } : r
      )
    );
  };

  return (
    <Box>
      {/* Header Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            Recipe Catalogue
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* ✅ Filter Panel */}
        <FilterPanel
          error={error}
          searchName={searchName}
          setSearchName={setSearchName}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          allIngredients={allIngredients}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          selectedDietaryPreferences={selectedDietaryPreferences}
          setSelectedDietaryPreferences={setSelectedDietaryPreferences}
          searchByUser={searchByUser}
          setSearchByUser={setSearchByUser}
          selectedServings={selectedServings}
          setSelectedServings={setSelectedServings}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />

        {/* ✅ Recipe Cards */}
        <Grid container spacing={4}>
          {filteredRecipes.length === 0 ? (
            <Typography sx={{ textAlign: "center", width: "100%" }}>
              No recipes found.
            </Typography>
          ) : (
            filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard recipe={recipe} onClick={setSelectedRecipe} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* ✅ Recipe Info Dialog */}
      <RecipeDialog
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
        onLike={handleLike}
        onDislike={handleDislike}
      />
    </Box>
  );
};

export default RecipeCatalog;
