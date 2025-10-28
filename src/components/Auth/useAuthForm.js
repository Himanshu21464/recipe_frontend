// src/components/Auth/useAuthForm.js
import { useState } from "react";
import { registerUser, loginUser } from "./AuthService";

export const useAuthForm = (onLogin, navigate) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser(username, email, password);
      if (data?.message === "User registered successfully") {
        alert("Registration successful!");
        setIsRegister(false);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Error during registration");
    }
  };

  const handleLogin = async () => {
    const { username, password } = formData;
    if (!username || !password) {
      setError("Both username and password are required");
      return;
    }

    try {
      const data = await loginUser(username, password);
      if (data.user) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin(data.user.username);
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Error during login");
    }
  };

  return {
    isRegister,
    formData,
    error,
    hoveredButton,
    toggleForm,
    handleChange,
    handleSubmit,
    setHoveredButton,
  };
};
