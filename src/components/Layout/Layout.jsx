/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem("username", user);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <Box
      sx={{
        backgroundImage: "url(https://source.unsplash.com/1600x900/?food,recipe)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header username={username} onLogout={handleLogout} />

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          margin: "16px auto",
          maxWidth: "1200px",
          width: "90%",
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
