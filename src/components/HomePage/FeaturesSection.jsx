import { Box, Typography, Grid, Paper, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { features, howToUseSteps } from "./data.jsx";

const FeaturesSection = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Box
      sx={{
        py: 10,
        position: "relative",
        color: theme.palette.text.primary,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // ✅ Background image with blur overlay
        backgroundImage: isLight
          ? "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1600&q=80')"
          : "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: isLight
            ? "rgba(255,255,255,0.6)"
            : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 0,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ==================== FEATURES SECTION ==================== */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: 6,
            fontFamily: "'Poppins', sans-serif",
            textShadow: isLight
              ? "1px 1px 3px rgba(255,255,255,0.8)"
              : "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          ✨ Features of RecipeHub
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mb: 10 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  border: `1.5px solid ${
                    isLight ? "#e0e0e0" : theme.palette.primary.main
                  }`,
                  background: isLight
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(25, 25, 25, 0.5)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: theme.palette.text.primary,
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: theme.palette.primary.main,
                    boxShadow:
                      "0 8px 25px rgba(0, 0, 0, 0.2), 0 0 12px rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.85,
                    lineHeight: 1.6,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ==================== HOW TO USE SECTION ==================== */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: 6,
            fontFamily: "'Poppins', sans-serif",
            textShadow: isLight
              ? "1px 1px 3px rgba(255,255,255,0.8)"
              : "1px 1px 3px rgba(0,0,0,0.6)",
          }}
        >
          🧑‍🍳 How to Use RecipeHub
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {howToUseSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  border: `1.5px solid ${
                    isLight ? "#e0e0e0" : theme.palette.primary.main
                  }`,
                  background: isLight
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(25, 25, 25, 0.5)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: theme.palette.text.primary,
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: theme.palette.primary.main,
                    boxShadow:
                      "0 8px 25px rgba(0, 0, 0, 0.2), 0 0 12px rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 60,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.85,
                    lineHeight: 1.6,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
