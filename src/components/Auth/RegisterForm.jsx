/* eslint-disable react/prop-types */
// src/components/Auth/RegisterForm.jsx

import { MDBInput } from "mdb-react-ui-kit";
import { buttonStyle, buttonHoverStyle } from "./styles";

const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  toggleForm,
  hoveredButton,
  setHoveredButton,
  loading, // ✅ Added loading prop
}) => (
  <>
    <MDBInput
      wrapperClass="mb-4"
      label="Username"
      type="text"
      size="lg"
      name="username"
      value={formData.username}
      onChange={handleChange}
    />

    <MDBInput
      wrapperClass="mb-4"
      label="Email address"
      type="email"
      size="lg"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />

    <MDBInput
      wrapperClass="mb-4"
      label="Password"
      type="password"
      size="lg"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />

    <MDBInput
      wrapperClass="mb-4"
      label="Confirm Password"
      type="password"
      size="lg"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
    />

    <div className="text-center text-md-start mt-4 pt-2">
      <button
        disabled={loading}
        style={hoveredButton === "register" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("register")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handleSubmit}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="small fw-bold mt-2 pt-1 mb-2">
        Already have an account?{" "}
        <a href="#!" className="link-danger" onClick={toggleForm}>
          Login
        </a>
      </p>
    </div>
  </>
);

export default RegisterForm;
