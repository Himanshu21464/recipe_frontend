/* eslint-disable react/prop-types */
// src/components/Auth/LoginSignupPage.jsx
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "./useAuthForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginSignupPage({ onLogin }) {
  const navigate = useNavigate();

  const {
    isRegister,
    formData,
    error,
    hoveredButton,
    toggleForm,
    handleChange,
    handleSubmit,
    setHoveredButton,
  } = useAuthForm(onLogin, navigate);

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Login illustration"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          {error && <div className="alert alert-danger">{error}</div>}

          {!isRegister ? (
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
              hoveredButton={hoveredButton}
              setHoveredButton={setHoveredButton}
            />
          ) : (
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
              hoveredButton={hoveredButton}
              setHoveredButton={setHoveredButton}
            />
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginSignupPage;
