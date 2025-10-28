/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoginSignupPage({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();


  // --- STYLE CHANGES START HERE ---

  // 1. Add state to track which button is hovered
  const [hoveredButton, setHoveredButton] = useState(null);

  // 2. Define the style objects for the button
  const buttonStyle = {
    backgroundColor: '#0d6efd', // A standard blue color
    color: 'white',
    padding: '10px 25px',
    border: 'none',
    borderRadius: '8px', // Little round edges
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'opacity 0.2s ease', // Smooth transition for the hover effect
  };

  const buttonHoverStyle = {
    ...buttonStyle, // Inherit all styles from the base style
    opacity: 0.8, // Change opacity on hover
  };

  // --- STYLE CHANGES END HERE ---


  // Toggle between login and register views
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError(''); // Reset error when toggling form
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  // Register new user
  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;

    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://cgas.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        setIsRegister(false); // Switch to login form
        setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Clear form
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Error during registration');
    }
  };

  // Handle login
  const handleLogin = async () => {
    const { username, password } = formData;

    // Validate input
    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }

    try {
      const response = await fetch('https://cgas.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful');
        // Save user data to localStorage after login
        localStorage.setItem('user', JSON.stringify(data.user)); 
        onLogin(data.user.username); // Update the App state with the username
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          {/* Display error message if any */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form for Login */}
          {!isRegister ? (
            <>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
                <a href="#!">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <button
                  style={hoveredButton === 'login' ? buttonHoverStyle : buttonStyle}
                  onMouseEnter={() => setHoveredButton('login')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Do not have an account?{' '}
                  <a href="#!" className="link-danger" onClick={toggleForm}>
                    Register
                  </a>
                </p>
              </div>
            </>
          ) : (
            /* Form for Register */
            <>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                id="formControlLg"
                type="password"
                size="lg"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <div className="text-center text-md-start mt-4 pt-2">
                <button
                  style={hoveredButton === 'register' ? buttonHoverStyle : buttonStyle}
                  onMouseEnter={() => setHoveredButton('register')}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Already have an account?{' '}
                  <a href="#!" className="link-danger" onClick={toggleForm}>
                    Login
                  </a>
                </p>
              </div>
            </>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginSignupPage;