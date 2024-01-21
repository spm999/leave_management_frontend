import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate
import './Employee.css'; // Adjust the filename as needed

const EmployeeLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:/employee/login`, formData);

      // Handle successful login, e.g., store authentication token and redirect
      const { authtoken, EmployeeId } = response.data;
      localStorage.setItem('authToken1', authtoken);
      // Navigate to the dashboard
      navigate(`/employee/${EmployeeId}/dashboard`);

    } catch (error) {
      // Handle login error
      console.error(error.response.data);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="employee-login-container">
      <h2 className="login-title">Employee Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <button type="submit" className="login-button">Login</button>
      </form>
      <Link to="/employee/signup" className="signup-link">Not have an account!</Link>
    </div>
  );
};

export default EmployeeLogin;
