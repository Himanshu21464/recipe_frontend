/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../../context/AuthContext.jsx"; // ✅ correct import

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "url(https://source.unsplash.com/1600x900/?food,kitchen) center/cover no-repeat",
      }}
    >
      <Header username={user?.username} onLogout={logout} />
      <Box sx={{ flexGrow: 1, p: 3, backdropFilter: "blur(8px)" }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
