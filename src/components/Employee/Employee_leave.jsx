import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Employee.css'; // Adjust the filename as needed

const EmployeeLeave = () => {
  const { empid } = useParams();
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken1');

      // Send leave request to the server
      await axios.post(
        `https://leave-management-5tyz.onrender.com/employee/${empid}/leaveRequest`,
        { leaveType, startDate, endDate, reason },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirect to the employee dashboard after successful leave request
      navigate(`/employee/${empid}/dashboard`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="employee-leave-container">
      <h2 className="leave-title">Make Leave Request</h2>
      {error && <p className="error-message">Error: {error}</p>}
      <form onSubmit={handleSubmit} className="leave-form">
        <label className="form-label">
          Leave Type:
          <input
            type="text"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <br />
        <label className="form-label">
          Reason:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="form-input"
          ></textarea>
        </label>
        <br />
        <button type="submit" className="submit-button">Submit Leave Request</button>
      </form>
    </div>
  );
};

export default EmployeeLeave;
