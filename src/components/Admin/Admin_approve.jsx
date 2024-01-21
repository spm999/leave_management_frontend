import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Admin.css'; // Adjust the filename as needed

const AdminApprove = () => {
  const { admid, leaveRequestId } = useParams();
  const [approvalStatus, setApprovalStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // If the authentication token is not present, redirect to the login page
      navigate('/');
      return;
    }

    const fetchLeaveRequest = async () => {
      try {
        const response = await axios.get(
          `https://leave-management-5tyz.onrender.com/admin/${admid}/dashboard`,
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const leaveRequests = response.data.leaveRequests;
        const selectedLeaveRequest = leaveRequests.find(request => request._id === leaveRequestId);

        if (!selectedLeaveRequest) {
          throw new Error('Leave request not found');
        }

        setApprovalStatus(selectedLeaveRequest.approvalStatus);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveRequest();
  }, [admid, leaveRequestId, navigate]);

  const handleApprovalChange = async newStatus => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:5172/admin/${admid}/approveLeave/${leaveRequestId}`,
        { approvalStatus: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      setApprovalStatus(newStatus);
    } catch (error) {
      console.error(error);
      setError('Failed to update approval status');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-approve-container">
      <h2 className="approve-title">Leave Approval</h2>
      <p className="request-id">Leave Request ID: {leaveRequestId}</p>
      <p className="status">Current Approval Status: {approvalStatus}</p>

      <div className="approval-buttons">
        <button onClick={() => handleApprovalChange('Yes')} className="approve-button">Approve</button>
        <button onClick={() => handleApprovalChange('No')} className="reject-button">Reject</button>
      </div>
    </div>
  );
};

export default AdminApprove;
