import { Box, Container, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "#333",
      color: "white",
      padding: "20px 0",
      marginTop: "auto",
    }}
  >
    <Container maxWidth={false}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ flex: "1", margin: "10px 0" }}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            RecipeHub is your go-to platform for discovering and sharing amazing recipes from around the world.
            Whether you are a beginner or a pro, we have something for everyone!
          </Typography>
        </Box>

        <Box sx={{ flex: "1", margin: "10px 0", textAlign: "right" }}>
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
      <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
        © {new Date().getFullYear()} RecipeHub. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
