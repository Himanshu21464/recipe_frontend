import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: "auto",
        py: 4,
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #fff8f3, #ffe3d8)"
            : "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
        color: theme.palette.text.primary,
        borderTop: `1px solid ${
          theme.palette.mode === "light" ? "#e0e0e0" : "#333"
        }`,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          gap: 3,
        }}
      >
        {/* ---------- Left Section ---------- */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            <RestaurantMenuIcon color="primary" /> RecipeHub
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, maxWidth: 350 }}>
            RecipeHub is your go-to platform for discovering and sharing amazing
            recipes from around the world. Whether you’re a beginner or a pro, we
            have something for everyone!
          </Typography>
        </Box>

        {/* ---------- Center Section ---------- */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} RecipeHub. All rights reserved.
          </Typography>
        </Box>

        {/* ---------- Right Section ---------- */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "right" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: 500, color: theme.palette.primary.main }}
          >
            Contact Us
          </Typography>

          <Stack
            direction="column"
            spacing={1}
            alignItems={{ xs: "center", md: "flex-end" }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                href="mailto:himanshu21464@iiitd.ac.in"
                color="primary"
                aria-label="email"
              >
                <EmailIcon />
              </IconButton>
              <Typography variant="body2">himanshu21464@iiitd.ac.in</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                href="https://github.com/Himanshu21464"
                target="_blank"
                color="primary"
                aria-label="github"
              >
                <GitHubIcon />
              </IconButton>
              <Typography variant="body2">Himanshu21464</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                href="https://www.linkedin.com/in/himanshu-rishabh-b547b1268/"
                target="_blank"
                color="primary"
                aria-label="linkedin"
              >
                <LinkedInIcon />
              </IconButton>
              <Typography variant="body2">Himanshu Rishabh</Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
