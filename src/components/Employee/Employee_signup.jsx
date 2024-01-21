import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Employee.css'; // Adjust the filename as needed

const EmployeeSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://leave-management-5tyz.onrender.com/employee/signup', formData);
      // console.log(response.data);

      setSuccessMessage('Signup successful! Redirecting to login...');
      setErrorMessage('');

      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/employee/login');
      }, 2000);
    } catch (error) {
      console.error(error.response.data);
      setSuccessMessage('');
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  return (
    <div className="employee-signup-container">
      <h2 className="signup-title">Employee Signup</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Organization:
          <input type="text" name="organization" value={formData.organization} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <button type="submit" className="signup-button">Signup</button>
      </form>
      <Link className='tologin' to="/employee/login">Already have an account!</Link>
    </div>
  );
};

export default EmployeeSignup;
