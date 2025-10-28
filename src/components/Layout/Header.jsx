/* eslint-disable react/prop-types */
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ username, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#333",
        boxShadow: "none",
        opacity: 0.9,
        height: 80,
      }}
    >
      <Toolbar sx={{ minHeight: "80px", padding: "0 24px" }}>
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            fontSize: "1.8rem",
          }}
        >
          RecipeHub
        </Typography>

        <Button color="inherit" component={Link} to="/" sx={{ fontSize: "1rem", ml: 2 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/catalog" sx={{ fontSize: "1rem", ml: 2 }}>
          View Recipes
        </Button>

        {!username ? (
          <Button color="inherit" component={Link} to="/login-signup" sx={{ fontSize: "1rem", ml: 2 }}>
            Login/Register
          </Button>
        ) : (
          <>
            <Button color="inherit" onClick={handleClick} sx={{ fontSize: "1rem", ml: 2 }}>
              Hi! {username}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={() => { handleClose(); onLogout(); }}>Logout</MenuItem>
              <MenuItem component={Link} to="/delete-recipe" onClick={handleClose}>
                Delete Recipes
              </MenuItem>
              <MenuItem component={Link} to="/RecipeForm" onClick={handleClose}>
                Upload Recipe
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
