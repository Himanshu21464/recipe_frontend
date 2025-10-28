/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Box, Button, useTheme } from "@mui/material";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import { useAuth } from "../../../context/AuthContext"; // ✅ import your AuthContext

const LikeDislikeButtons = ({ onLike, onDislike }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const { user } = useAuth(); // ✅ get logged-in user info

  // If user not logged in, hide buttons
  if (!user) return null;

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ThumbUpAltRoundedIcon />}
        onClick={onLike}
        sx={{
          px: 4,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          background: "linear-gradient(90deg, #ff7043, #ffa726)",
          "&:hover": {
            background: "linear-gradient(90deg, #ff5722, #ff9800)",
          },
        }}
      >
        Like
      </Button>

      <Button
        variant="outlined"
        startIcon={<ThumbDownAltRoundedIcon />}
        onClick={onDislike}
        sx={{
          px: 4,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          color: isLight ? "#ff3d00" : "#ff7043",
          borderColor: isLight ? "#ff3d00" : "#ff7043",
          "&:hover": {
            backgroundColor: isLight ? "#fff1ee" : "#2c2c2c",
            borderColor: "#ff5722",
          },
        }}
      >
        Dislike
      </Button>
    </Box>
  );
};

export default LikeDislikeButtons;
