// import React, { useState } from 'react';
// import './Admin.css';
// import { useNavigate } from 'react-router-dom';

// const Admin_login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5172/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const responseData = await response.json();

//       if (responseData.login) {
//         console.log('Login successful');
        
//         // Store the token in localStorage
//         localStorage.setItem('authToken', responseData.token);
//          console.log("Token saved")
//         // Redirect to /admin/:admid/dashboard
//         navigate(`/admin/${responseData.admid}/dashboard`);
//       } else {
//         console.log('Login failed');
//         // Handle login failure, show error message, etc.
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//     <h2 className="login-title">Admin Login</h2>
//     <form onSubmit={handleLogin} className="login-form">
//       <label className="form-label">
//         Email:
//         <input type="email" name="email" onChange={handleChange} required className="form-input" />
//       </label>
//       <br />
//       <label className="form-label">
//         Password:
//         <input type="password" name="password" onChange={handleChange} required className="form-input" />
//       </label>
//       <br />
//       <button type="submit" className="login-button">Login</button>
//     </form>
//   </div>
//   );
// };

// export default Admin_login;

import React, { useState } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const Admin_login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://leave-management-5tyz.onrender.com/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.login) {
        console.log('Login successful');
        
        // Store the token in localStorage
        localStorage.setItem('authToken', responseData.token);
        console.log("Token saved")
        // Redirect to /admin/:admid/dashboard
        navigate(`/admin/${responseData.admid}/dashboard`);
      } else {
        console.log('Login failed');
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="login-title">Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <label className="form-label">
          Email:
          <input type="email" name="email" onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Password:
          <input type="password" name="password" onChange={handleChange} required className="form-input" />
        </label>
        <br />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Admin_login;

