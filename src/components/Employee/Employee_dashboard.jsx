import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Employee.css'; // Adjust the filename as needed

const EmployeeDashboard = () => {
  const { empid } = useParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authentication token from localStorage
    localStorage.removeItem('authToken1');
    navigate('/');
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken1');

    // if (!authToken) {
    //   // If the authentication token is not present, redirect to the login page
    //   navigate('/');
    // }
    if (authToken){
      navigate(`/employee/${empid}/dashboard`)
    }
    else{
      navigate('/')
    }

    const fetchDashboardData = async () => {
      try {
        // Fetch employee dashboard data
        const responseDashboard = await axios.get(`http://localhost:5172/employee/${empid}/dashboard`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const dataDashboard = responseDashboard.data;
        setDashboardData(dataDashboard);

        // Fetch leave requests made by the employee
        const responseLeaveRequests = await axios.get(`http://localhost:5172/employee/${empid}/leaverequests`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const dataLeaveRequests = responseLeaveRequests.data;
        setLeaveRequests(dataLeaveRequests);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [empid, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="employee-dashboard-container">
      <h2 className="dashboard-message">{dashboardData.message}!</h2>

      {/* Display leave requests in columns */}
      <h3 className="leave-requests-header">Leave Requests:</h3>
      <div className="leave-requests-columns">
        {leaveRequests.map((request) => (
          <div key={request._id} className="leave-request-column">
            <p><strong>Leave Request ID:</strong> {request._id}</p>
            <p><strong>Status:</strong> {request.approvalStatus}</p>
            <p><strong>Leave Type:</strong> {request.leaveType}</p>
            <p><strong>Start Date:</strong> {request.startDate}</p>
            <p><strong>End Date:</strong> {request.endDate}</p>
            <p><strong>Reason:</strong> {request.reason}</p>
          </div>
        ))}
      </div>

      {/* Link to make a leave request */}
      <Link to={`/employee/${empid}/leaverequest`} className="make-leave-request-link">Make Leave Request</Link>

      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default EmployeeDashboard;
