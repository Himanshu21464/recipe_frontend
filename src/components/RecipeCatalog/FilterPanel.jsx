/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Grid, TextField, MenuItem, Slider, Typography, Button, Box, Paper } from "@mui/material";

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
}) => (
  <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: "#f5f5f5", width: "100%" }}>
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
      Search & Filter Recipes
    </Typography>
    {error && <Typography color="error">{error}</Typography>}

    <Box sx={{ width: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Recipe Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>

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

        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Filter by Cooking Time (minutes)</Typography>
          <Slider
            value={timeRange}
            onChange={(e, v) => setTimeRange(v)}
            min={0}
            max={360}
            valueLabelDisplay="auto"
          />
        </Grid>

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
            {["Vegan", "Vegetarian", "Keto", "Paleo", "Gluten-Free", "Dairy-Free"].map(
              (pref, i) => (
                <MenuItem key={i} value={pref}>
                  {pref}
                </MenuItem>
              )
            )}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Username"
            value={searchByUser}
            onChange={(e) => setSearchByUser(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Filter by Servings</Typography>
          <Slider
            value={selectedServings}
            onChange={(e, v) => setSelectedServings(v)}
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default FilterPanel;
