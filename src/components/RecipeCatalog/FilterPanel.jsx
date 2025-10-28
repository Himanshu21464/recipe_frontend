/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Slider,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const FilterPanel = ({
  error,
  searchName,
  setSearchName,
  selectedIngredients,
  setSelectedIngredients,
  allIngredients,
  timeRange,
  setTimeRange,
  selectedDietaryPreferences,
  setSelectedDietaryPreferences,
  searchByUser,
  setSearchByUser,
  selectedServings,
  setSelectedServings,
  handleSearch,
  handleReset,
}) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Paper
      elevation={5}
      sx={{
        p: 4,
        mb: 4,
        width: "100%",
        borderRadius: 4,
        background: isLight
          ? "linear-gradient(135deg, #fffdf8, #fff3e6)"
          : "linear-gradient(135deg, #1c1c1c, #2a2a2a)",
        color: theme.palette.text.primary,
        boxShadow: isLight
          ? "0 6px 20px rgba(0,0,0,0.08)"
          : "0 6px 20px rgba(255,255,255,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: isLight
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 8px 24px rgba(255,255,255,0.12)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          mb: 3,
          fontFamily: "'Poppins', sans-serif",
          textAlign: "center",
          color: theme.palette.primary.main,
        }}
      >
        Search & Filter Recipes
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          {/* Search by Recipe Name */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search by Recipe Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            />
          </Grid>

          {/* Ingredients Filter */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Filter by Ingredients"
              fullWidth
              variant="outlined"
              SelectProps={{
                multiple: true,
                value: selectedIngredients,
                onChange: (e) => setSelectedIngredients(e.target.value),
              }}
            >
              {allIngredients.map((ing, i) => (
                <MenuItem key={i} value={ing}>
                  {ing}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Cooking Time Slider */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom color={theme.palette.text.secondary}>
              Filter by Cooking Time (minutes)
            </Typography>
            <Slider
              value={timeRange}
              onChange={(e, v) => setTimeRange(v)}
              min={0}
              max={360}
              valueLabelDisplay="auto"
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Grid>

          {/* Dietary Preferences */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Dietary Preferences"
              fullWidth
              variant="outlined"
              SelectProps={{
                multiple: true,
                value: selectedDietaryPreferences,
                onChange: (e) => setSelectedDietaryPreferences(e.target.value),
              }}
            >
              {[
                "Vegan",
                "Vegetarian",
                "Non-Vegetarian",
                "Keto",
                "Paleo",
                "Gluten-Free",
                "Dairy-Free",
              ].map((pref, i) => (
                <MenuItem key={i} value={pref}>
                  {pref}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Search by Username */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Search by Username"
              value={searchByUser}
              onChange={(e) => setSearchByUser(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* Servings Slider */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography gutterBottom color={theme.palette.text.secondary}>
              Filter by Servings
            </Typography>
            <Slider
              value={selectedServings}
              onChange={(e, v) => setSelectedServings(v)}
              min={1}
              max={10}
              valueLabelDisplay="auto"
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              sx={{
                py: 1.2,
                borderRadius: 3,
                fontWeight: "bold",
                background: theme.palette.primary.main,
                color: "#fff",
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  background: theme.palette.primary.dark,
                },
              }}
            >
              Apply Filters
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 3,
                fontWeight: "bold",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                transition: "all 0.2s ease",
                "&:hover": {
                  background: theme.palette.action.hover,
                },
              }}
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
