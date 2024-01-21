// AdminDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Admin.css'

const AdminDashboard = () => {
  const { admid } = useParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem("authToken");

    // Redirect the user to the login page
    navigate('/');
  };

  const handleLeaveClick = (leaveRequestId) => {
    // Navigate to the approval page for the specific leave request
    navigate(`/admin/${admid}/approveLeave/${leaveRequestId}`);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // If the authentication token is not present, redirect to the login page
      navigate('/');
      return;
    }
    const fetchDashboardData = async () => {
      try {

        const response = await axios.get(`http://localhost:5172/admin/${admid}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        setDashboardData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [admid]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-message">{dashboardData.message}</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <h3 className="leave-requests-header">Leave Requests:</h3>
      <div className="leave-requests-list">
        {dashboardData.leaveRequests.map((request) => (
          <div
            key={request._id}
            className="leave-request"
            onClick={() => handleLeaveClick(request._id)}
          >
            <p>Leave Request ID: {request._id}</p>
            <p>Status: {request.approvalStatus}</p>
            <p>Employee ID: {request.employeeId}</p>
            <p>Leave Type: {request.leaveType}</p>
            <p>Start Date: {request.startDate}</p>
            <p>End Date: {request.endDate}</p>
            <p>Reason: {request.reason}</p>
          </div>
        ))}
      </div>

      {/* Logout button */}
    </div>
  );
};

export default AdminDashboard;
