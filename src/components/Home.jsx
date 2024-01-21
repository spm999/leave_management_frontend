// Home.jsx
import './Home.css'
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <h1>Leave Management System</h1>
      </header>

      <main>
        <div className="login-container1">
          <h2>Admin Login</h2>
          <Link to="/admin/login">
            <button>Login as Admin</button>
          </Link>
        </div>

        <div className="login-container1">
          <h2>Employee Login</h2>
          <Link to="/employee/login">
            <button>Login as Employee</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
