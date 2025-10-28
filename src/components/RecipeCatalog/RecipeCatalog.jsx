/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterPanel from "./FilterPanel";
import RecipeCard from "./RecipeCard";
import RecipeDialog from "./RecipeDialog/RecipeDialog.jsx";
import { fetchRecipes, likeRecipe, dislikeRecipe } from "./api";

const RecipeCatalog = () => {
  const theme = useTheme(); // ✅ Access current theme (light/dark)

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [timeRange, setTimeRange] = useState([0, 360]);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [searchByUser, setSearchByUser] = useState("");
  const [selectedServings, setSelectedServings] = useState([1, 10]);
  const [allIngredients, setAllIngredients] = useState([]);

  // ✅ Load recipes once
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);

        // Collect unique ingredients for filter
        const ingredients = new Set();
        data.forEach((r) => {
          if (Array.isArray(r.ingredients)) {
            r.ingredients.forEach((ing) =>
              ingredients.add(ing.name?.trim().toLowerCase())
            );
          } else if (typeof r.ingredients === "string") {
            r.ingredients
              .split(",")
              .forEach((ing) => ingredients.add(ing.trim().toLowerCase()));
          }
        });

        setAllIngredients([...ingredients]);
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, []);

  // ✅ Search Logic
  const handleSearch = () => {
    const filtered = recipes.filter((recipe) => {
      const matchesName = recipe.name
        ?.toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesUser = recipe.username
        ?.toLowerCase()
        .includes(searchByUser.toLowerCase());

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

const matchesDiet = selectedDietaryPreferences.every((pref) => {
  if (Array.isArray(recipe.dietaryPreferences)) {
    return recipe.dietaryPreferences.some(
      (diet) => diet.toLowerCase() === pref.toLowerCase()
    );
  }
  return recipe.dietaryPreferences?.toLowerCase() === pref.toLowerCase();
});


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
        r.id === recipe.id
          ? { ...r, dislikeCount: (r.dislikeCount || 0) + 1 }
          : r
      )
    );
  };

  // ✅ Theme-based background gradient
  const gradientBackground =
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #fff8f2 0%, #ffe0b2 50%, #fff8f2 100%)"
      : "linear-gradient(135deg, #121212 0%, #1e1e1e 50%, #212121 100%)";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: gradientBackground,
        color: theme.palette.text.primary,
        transition: "background 0.5s ease",
        p: 3,
      }}
    >
      {/* Header Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : "#1f1f1f",
          boxShadow: 3,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            🍲 Recipe Catalogue
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ Directly place content without a white box */}
      <Box sx={{ mt: 4 }}>
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

        <Grid
          container
          spacing={2} // reduce space between cards
          justifyContent="center"
          sx={{
            mt: 2,
            rowGap: 2,
          }}
        >
          {filteredRecipes.length === 0 ? (
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                mt: 4,
                fontStyle: "italic",
              }}
            >
              No recipes found 🍽️
            </Typography>
          ) : (
            filteredRecipes.map((recipe) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3} // ✅ was 4 (3 cards/row), now 3 → 4 cards/row
                lg={2.4} // ✅ optional tweak → ~5 cards on large screens
                key={recipe.id}
              >
                <RecipeCard recipe={recipe} onClick={setSelectedRecipe} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

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
