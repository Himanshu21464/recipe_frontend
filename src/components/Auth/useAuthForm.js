// src/components/Auth/useAuthForm.js
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "./AuthService";

export const useAuthForm = (onLogin, navigate) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [hoveredButton, setHoveredButton] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new loading state

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      if (isRegister) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;

    // ✅ Instant validation feedback
    if (!username || !email || !password || !confirmPassword) {
      toast.warning("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const data = await registerUser(username, email, password);

      if (data?.message === "User registered successfully" || data?.success) {
        toast.success("🎉 Registration successful!");
        setIsRegister(false);
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong during registration.");
    }
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      toast.warning("Both username and password are required!");
      return;
    }

    try {
      const data = await loginUser(username, password);

      if (data.user) {
        toast.success("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin?.(data.user.username);
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error. Please try again later.");
    }
  };

  return {
    isRegister,
    formData,
    hoveredButton,
    toggleForm,
    handleChange,
    handleSubmit,
    setHoveredButton,
    loading, // ✅ expose loading for buttons
  };
};
