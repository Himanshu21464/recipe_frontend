import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Container, Menu, MenuItem } from '@mui/material';
import RecipeForm from './components/RecipeForm/RecipeForm.jsx';
import RecipeCatalog from './components/RecipeCatalog/RecipeCatalog.jsx';
import HomePage from './components/HomePage/HomePage';
import LoginSignupPage from './components/Auth/LoginSignupPage.jsx';
import DeleteRecipe from './components/DeleteRecipe/DeleteRecipe.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [username, setUsername] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Update the username from localStorage when the app loads or when localStorage changes
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []); // Empty dependency array to only run on component mount

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null); // Clear username from state
  };

  const handleLogin = (user) => {
    localStorage.setItem('username', user);
    setUsername(user); // Set username in state
  };

  return (
    <Router>
      <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?food,recipe)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        {/* Main Header */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#333',
            boxShadow: 'none',
            opacity: 0.9,
            height: 80,
          }}
        >
          <Toolbar
            sx={{
              minHeight: '80px',
              padding: '0 24px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: '1.8rem',
              }}
            >
              RecipeHub
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{ textTransform: 'none', fontSize: '1rem', marginLeft: 2 }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/catalog"
              sx={{ textTransform: 'none', fontSize: '1rem', marginLeft: 2 }}
            >
              View Recipes
            </Button>

            {!username ? (
              <Button
                color="inherit"
                component={Link}
                to="/login-signup"
                sx={{ textTransform: 'none', fontSize: '1rem', marginLeft: 2 }}
              >
                Login/Register
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleClick}
                sx={{ textTransform: 'none', fontSize: '1rem', marginLeft: 2 }}
              >
                Hi! {username}
              </Button>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem component={Link} to="/delete-recipe" onClick={handleClose}>Delete Recipes</MenuItem>
              <MenuItem component={Link} to="/RecipeForm" onClick={handleClose}>Upload Recipe</MenuItem> {/* Added Upload Recipe button */}
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            margin: '16px auto',
            maxWidth: '1200px',
            width: '90%',
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/RecipeForm" element={<RecipeForm />} />
            <Route path="/catalog" element={<RecipeCatalog />} />
            <Route path="/delete-recipe" element={<DeleteRecipe />} />
            <Route
              path="/login-signup"
              element={<LoginSignupPage onLogin={handleLogin} />}
            />
          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            backgroundColor: '#333',
            color: 'white',
            padding: '20px 0',
            marginTop: 'auto',
          }}
        >
          <Container maxWidth={false}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              {/* About Us Section */}
              <Box sx={{ flex: '1', margin: '10px 0' }}>
                <Typography variant="h6" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2">
                  RecipeHub is your go-to platform for discovering and sharing amazing recipes from around the world.
                  Whether you are a beginner or a pro, we have something for everyone!
                </Typography>
              </Box>

              {/* Contact Us Section */}
              <Box sx={{ flex: '1', margin: '10px 0', textAlign:'right'}}>
                <Typography variant="h6" gutterBottom>
                  Contact Us
                </Typography>
                <Typography variant="body2">
                  Email: himanshu21464@iiitd.ac.in
                  <br />
                  Email: siddharth21493@iiitd.ac.in 
                  <br />
                  Address: IIIT Delhi
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
              © {new Date().getFullYear()} RecipeHub. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Router>
    
  );
}

export default App;
