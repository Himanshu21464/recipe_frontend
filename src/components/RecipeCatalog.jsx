/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  TextField,
  MenuItem,
  Slider,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import moment from "moment"; // Import moment for date formatting
import CloseIcon from "@mui/icons-material/Close"; // Close button for the dialog
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Like icon
import ThumbDownIcon from "@mui/icons-material/ThumbDown"; // Dislike icon


const RecipeCatalog = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [timeRange, setTimeRange] = useState([0, 360]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe for the dialog
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState(
    []
  );
  const [selectedServings, setSelectedServings] = useState([1, 10]);
  const [searchByUser, setSearchByUser] = useState(""); // New state for filtering by username

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://cgas.onrender.com/recipes/");
        const data = await response.json();
        if (response.ok) {
          setRecipes(data.recipes);
          setFilteredRecipes(data.recipes);

          const ingredientsSet = new Set();
          data.recipes.forEach((recipe) => {
            recipe.ingredients
              .split(",")
              .forEach((ingredient) => ingredientsSet.add(ingredient.trim()));
          });
          setAllIngredients([...ingredientsSet]);
        } else {
          setError(data.message || "Something went wrong");
        }
      } catch (err) {
        setError("Error fetching recipes: " + err.message);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = () => {
    const lowerSearchName = searchName.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients
        .toLowerCase()
        .split(",")
        .map((item) => item.trim());
      const matchesName = recipe.name.toLowerCase().includes(lowerSearchName);
      const matchesIngredients = selectedIngredients.every((ingredient) =>
        recipeIngredients.includes(ingredient.toLowerCase())
      );
      const matchesTime =
        recipe.duration >= timeRange[0] && recipe.duration <= timeRange[1];
      const matchesDietaryPreferences = selectedDietaryPreferences.every(
        (preference) => recipe.dietaryPreferences.includes(preference)
      );
      const matchesServings =
        recipe.servings >= selectedServings[0] &&
        recipe.servings <= selectedServings[1];
      const matchesUser =
        searchByUser === "" ||
        recipe.username.toLowerCase().includes(searchByUser.toLowerCase()); // Check if the username matches

      return (
        matchesName &&
        matchesIngredients &&
        matchesTime &&
        matchesDietaryPreferences &&
        matchesServings &&
        matchesUser
      );
    });
    setFilteredRecipes(filtered);
  };

  // New method to handle liking a recipe
  const handleLikeRecipe = async (recipeId) => {
    try {
      // Check if user is logged in
      // if (!username) {
      //   alert('Please log in to like recipes');
      //   return;
      // }

      // Check if already liked
      // if (likedRecipes.includes(recipeId)) {
      //   return;
      // }

      const response = await fetch("https://cgas.onrender.com/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: selectedRecipe?.id,
          username: selectedRecipe?.username,
        }),
      });

      if (response.ok) {
        // Update local state
        setLikedRecipes([...likedRecipes, recipeId]);

        // Update the recipe's like count in the UI
        const updatedRecipes = recipes.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, likeCount: (recipe.likeCount || 0) + 1 }
            : recipe
        );
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to like recipe");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
      alert("An error occurred while liking the recipe");
    }
  };

  // New method to handle disliking a recipe
  const handleDislikeRecipe = async (recipeId) => {
    try {
      // Check if user is logged in
      // if (!username) {
      //   alert('Please log in to dislike recipes');
      //   return;
      // }

      // // Check if already disliked
      // if (dislikedRecipes.includes(recipeId)) {
      //   return;
      // }

      const response = await fetch("https://cgas.onrender.com/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: selectedRecipe?.id,
          username: selectedRecipe?.username,
        }),
      });

      if (response.ok) {
        // Update local state
        setDislikedRecipes([...dislikedRecipes, recipeId]);

        // Update the recipe's dislike count in the UI
        const updatedRecipes = recipes.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, dislikeCount: (recipe.dislikeCount || 0) + 1 }
            : recipe
        );
        setRecipes(updatedRecipes);
        setFilteredRecipes(updatedRecipes);
      } else {
        const data = await response.json();
        alert(data.message || "Failed to dislike recipe");
      }
    } catch (error) {
      console.error("Error disliking recipe:", error);
      alert("An error occurred while disliking the recipe");
    }
  };

  const handleReset = () => {
    setSearchName("");
    setSelectedIngredients([]);
    setTimeRange([0, 120]);
    setSearchByUser(""); // Reset username filter
    setFilteredRecipes(recipes);
  };

  const openRecipeDialog = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenDialog(true);
  };

  const closeRecipeDialog = () => {
    setOpenDialog(false);
    setSelectedRecipe(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3f51b5", width: "100%" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Recipe Catalogue
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          marginTop: 4,
          marginBottom: 4,
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginBottom: 4,
            backgroundColor: "#f5f5f5",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Search & Filter Recipes
          </Typography>
          {error && <Typography color="error">{error}</Typography>}

          {/* Filter Section */}
          <Box mb={4} sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              {/* Existing Search by Recipe Name */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Search by Recipe Name"
                  variant="outlined"
                  fullWidth
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </Grid>

              {/* Existing Filter by Ingredients */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Filter by Ingredients"
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    multiple: true,
                    value: selectedIngredients,
                    onChange: (e) => setSelectedIngredients(e.target.value),
                  }}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                >
                  {allIngredients.map((ingredient, index) => (
                    <MenuItem key={index} value={ingredient}>
                      {ingredient}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Filter by Cooking Time */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography gutterBottom>
                  Filter by Cooking Time (minutes)
                </Typography>
                <Slider
                  value={timeRange}
                  onChange={(e, newValue) => setTimeRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={360}
                  sx={{ color: "#3f51b5" }}
                />
              </Grid>

              {/* New Filter by Dietary Preferences */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  select
                  label="Filter by Dietary Preferences"
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    multiple: true,
                    value: selectedDietaryPreferences,
                    onChange: (e) =>
                      setSelectedDietaryPreferences(e.target.value),
                  }}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                >
                  {[
                    "Vegan",
                    "Vegetarian",
                    "Gluten-Free",
                    "Dairy-Free",
                    "Keto",
                    "Paleo",
                  ].map((preference, index) => (
                    <MenuItem key={index} value={preference}>
                      {preference}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Search by Username"
                  variant="outlined"
                  fullWidth
                  value={searchByUser}
                  onChange={(e) => setSearchByUser(e.target.value)}
                  sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                />
              </Grid>

              {/* New Filter by Servings */}
              <Grid item xs={12} sm={6} md={4}>
                <Typography gutterBottom>Filter by Servings</Typography>
                <Slider
                  value={selectedServings}
                  onChange={(e, newValue) => setSelectedServings(newValue)}
                  valueLabelDisplay="auto"
                  min={1}
                  max={10}
                  sx={{ color: "#3f51b5" }}
                />
              </Grid>

              {/* Apply and Reset Filters */}
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  fullWidth
                  sx={{
                    padding: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    backgroundColor: "#3f51b5",
                    "&:hover": { backgroundColor: "#303f9f" },
                  }}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                  fullWidth
                  sx={{
                    padding: 1.5,
                    marginTop: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Reset Filters
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Display Recipes */}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {filteredRecipes.length === 0 ? (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ width: "100%", textAlign: "center" }}
            >
              No recipes available.
            </Typography>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  onClick={() => openRecipeDialog(recipe)} // Open dialog on card click
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.imageUrl}
                    alt={recipe.name}
                    sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      {recipe.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold", color: "#333" }}
                    >
                      Uploaded By: {recipe.username}
                    </Typography>
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Servings:</strong> {recipe.servings}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Dietary Preferences:</strong>{" "}
                        {recipe.dietaryPreferences || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Likes:</strong> {recipe.likeCount || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Flagged as inappropriate:</strong>{" "}
                        {recipe.dislikeCount || "N/A"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Recipe Details Dialog (Popup) */}
      <Dialog
        open={openDialog}
        onClose={closeRecipeDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{selectedRecipe?.name}</Typography>
          <IconButton edge="end" color="inherit" onClick={closeRecipeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Recipe Image */}
            <CardMedia
              component="img"
              height="300"
              image={selectedRecipe?.imageUrl}
              alt={selectedRecipe?.name}
              sx={{ borderRadius: 2 }}
            />

            {/* Recipe Information Section */}
            <Box
              sx={{
                width: "100%",
                marginTop: 2,
                backgroundColor: "#e0f7fa",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Recipe Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Ingredients:</strong> {selectedRecipe?.allIngredients}{" "}
                    minutes
                  </Typography>

                  <Typography variant="body1">
                    <strong>Utensils:</strong>{" "}
                    {selectedRecipe?.utensils || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {selectedRecipe?.duration}{" "}
                    minutes
                  </Typography>
                  <Typography variant="body1">
                    <strong>Servings:</strong> {selectedRecipe?.servings}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Dietary Preferences:</strong>{" "}
                    {selectedRecipe?.dietaryPreferences || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            {/* Preparation Steps Section */}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#e0f7fa",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Preparation Steps
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {selectedRecipe?.steps?.split("|").map((step, index) => (
                    <Typography key={index} variant="body1">
                      <strong></strong> {step.trim()}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            {/* Nutritional Values Section */}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#e0f7fa",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Nutritional Values
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body1">
                    <strong>Calories:</strong> {selectedRecipe?.calories} kcal
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body1">
                    <strong>Fat:</strong> {selectedRecipe?.fat} g
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body1">
                    <strong>Carbohydrates:</strong>{" "}
                    {selectedRecipe?.carbohydrates} g
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="body1">
                    <strong>Protein:</strong> {selectedRecipe?.protein} g
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

            {/* Upload Details Section */}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#e0f7fa",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Upload Details
              </Typography>
              <Typography variant="body1">
                <strong>Upload Date:</strong>{" "}
                {moment(selectedRecipe?.uploadDate).format(
                  "MMMM Do YYYY, h:mm A"
                )}
              </Typography>
              <Typography variant="body1">
                <strong>Uploaded By:</strong> {selectedRecipe?.username}
              </Typography>
              <Typography variant="body1">
                <strong>Likes:</strong> {selectedRecipe?.likeCount || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Flagged as inappropriate:</strong>{" "}
                {selectedRecipe?.dislikeCount || "N/A"}
              </Typography>
            </Box>

            {/* Like and Dislike Buttons Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 2,
                gap: 2,
              }}
            >
              <Button
                startIcon={<ThumbUpIcon />}
                variant="contained"
                color="primary"
                onClick={async () => {
                  try {
                    // if (!username) {
                    //   alert('Please log in to like recipes');
                    //   return;
                    // }

                    // if (likedRecipes.includes(selectedRecipe?.id)) {
                    //   return;
                    // }

                    const response = await fetch(
                      "https://cgas.onrender.com/recipes/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          recipeId: selectedRecipe?.id,
                          username: selectedRecipe?.username,
                        }),
                      }
                    );

                    if (response.ok) {
                      setLikedRecipes([...likedRecipes, selectedRecipe?.id]);

                      const updatedRecipe = {
                        ...selectedRecipe,
                        likeCount: (selectedRecipe?.likeCount || 0) + 1,
                      };
                      setSelectedRecipe(updatedRecipe);

                      const updatedRecipes = recipes.map((recipe) =>
                        recipe.id === selectedRecipe?.id
                          ? {
                              ...recipe,
                              likeCount: (recipe.likeCount || 0) + 1,
                            }
                          : recipe
                      );
                      setRecipes(updatedRecipes);
                      setFilteredRecipes(updatedRecipes);
                    } else {
                      const data = await response.json();
                      alert(data.message || "Failed to like recipe");
                    }
                  } catch (error) {
                    console.error("Error liking recipe:", error);
                    alert("An error occurred while liking the recipe");
                  }
                }}
              >
                Like ({selectedRecipe?.likeCount || 0})
              </Button>
              <Button
                startIcon={<ThumbDownIcon />}
                variant="contained"
                color="secondary"
                onClick={async () => {
                  try {
                    // if (!username) {
                    //   alert('Please log in to dislike recipes');
                    //   return;
                    // }

                    // if (dislikedRecipes.includes(selectedRecipe?.id)) {
                    //   return;
                    // }

                    const response = await fetch(
                      "https://cgas.onrender.com/recipes/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          recipeId: selectedRecipe?.id,
                          username: selectedRecipe?.username,
                        }),
                      }
                    );

                    if (response.ok) {
                      setDislikedRecipes([
                        ...dislikedRecipes,
                        selectedRecipe?.id,
                      ]);

                      const updatedRecipe = {
                        ...selectedRecipe,
                        dislikeCount: (selectedRecipe?.dislikeCount || 0) + 1,
                      };
                      setSelectedRecipe(updatedRecipe);

                      const updatedRecipes = recipes.map((recipe) =>
                        recipe.id === selectedRecipe?.id
                          ? {
                              ...recipe,
                              dislikeCount: (recipe.dislikeCount || 0) + 1,
                            }
                          : recipe
                      );
                      setRecipes(updatedRecipes);
                      setFilteredRecipes(updatedRecipes);
                    } else {
                      const data = await response.json();
                      alert(data.message || "Failed to dislike recipe");
                    }
                  } catch (error) {
                    console.error("Error disliking recipe:", error);
                    alert("An error occurred while disliking the recipe");
                  }
                }}
              >
                Dislike ({selectedRecipe?.dislikeCount || 0})
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RecipeCatalog;
