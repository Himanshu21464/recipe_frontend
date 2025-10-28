/* eslint-disable react/prop-types */
// src/components/Auth/LoginForm.jsx
import { MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import { buttonStyle, buttonHoverStyle } from "./styles";

const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  toggleForm,
  hoveredButton,
  setHoveredButton,
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
      label="Password"
      type="password"
      size="lg"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me" />
      <a href="#!">Forgot password?</a>
    </div>

    <div className="text-center text-md-start mt-4 pt-2">
      <button
        style={hoveredButton === "login" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("login")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handleSubmit}
      >
        Login
      </button>
      <p className="small fw-bold mt-2 pt-1 mb-2">
        Don’t have an account?{" "}
        <a href="#!" className="link-danger" onClick={toggleForm}>
          Register
        </a>
      </p>
    </div>
  </>
);

export default LoginForm;
