import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { mode, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: "blur(12px)",
        background:
          mode === "light"
            ? "rgba(255,255,255,0.8)"
            : "rgba(18,18,18,0.8)",
        color: theme.palette.text.primary,
        boxShadow: "none",
        borderBottom: `1px solid ${
          mode === "light" ? "#eee" : "#333"
        }`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.primary.main,
          }}
        >
          <RestaurantMenuIcon /> RecipeHub
        </Typography>

        <div>
          <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />} sx={{ mx: 1 }}>
            Home
          </Button>
          <Button
            component={Link}
            to="/catalog"
            color="inherit"
            startIcon={<MenuBookIcon />}
            sx={{ mx: 1 }}
          >
            View Recipes
          </Button>

          <IconButton onClick={toggleTheme} color="inherit" sx={{ mx: 1 }}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {user ? (
            <>
              <Tooltip title={user.name || user.username || "Account"}>
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      fontSize: "1rem",
                    }}
                  >
                    {(user?.name?.[0] ||
                      user?.username?.[0] ||
                      user?.email?.[0] ||
                      "U"
                    ).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                }}
              >
                <MenuItem component={Link} to="/RecipeForm" onClick={handleClose} sx={{ gap: 1 }}>
                  <AddCircleOutlineIcon /> Upload Recipe
                </MenuItem>
                <MenuItem component={Link} to="/delete-recipe" onClick={handleClose} sx={{ gap: 1 }}>
                  <DeleteOutlineIcon /> Delete Recipes
                </MenuItem>
                <MenuItem
                  onClick={
                    handleLogout}
                  sx={{ gap: 1 }}
                >
                  <LogoutIcon /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login-signup"
              variant="outlined"
              sx={{ mx: 1 }}
            >
              Login / Register
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
