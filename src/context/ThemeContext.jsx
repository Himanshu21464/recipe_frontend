/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  // ✅ Load saved theme from localStorage or fallback to light
  const getInitialTheme = () => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "light";
  };

  const [mode, setMode] = useState(getInitialTheme);

  // ✅ Whenever mode changes, store it in localStorage
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f9f9f9",
                },
                primary: { main: "#ff7043" },
                secondary: { main: "#607d8b" },
              }
            : {
                background: {
                  default: "#121212",
                },
                primary: { main: "#ff8a65" },
                secondary: { main: "#90a4ae" },
              }),
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
