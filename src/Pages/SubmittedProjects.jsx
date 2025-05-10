// src/components/ProjectSubmissions.js
import React, { useEffect, useState } from 'react';

import { API_BASE_URL } from "../api/apiactions";
import { getLocalStorage } from "../Utils/storageutility";
import { accessTokenKey } from "../constants/storageconstants";
import axios from 'axios';


const ProjectSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetchSubmissions = async () => {
    try {
      const token = getLocalStorage(accessTokenKey);
      const response = await axios.get(`${API_BASE_URL}/api/getProjectDetails`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubmissions(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load submissions.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const updateStatus = async (user_id, course_id, newStatus) => {
    try {
      const token = getLocalStorage(accessTokenKey);
      await axios.post(`${API_BASE_URL}/api/approve-reject`, {
        user_id,
        course_id,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchSubmissions(); // Refresh list after update
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Project Submissions</h1>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Email ID</th>
            <th className="border px-4 py-2">Course name</th>
            <th className="border px-4 py-2">Submission Link</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(sub => (
            <tr key={sub.id} className="hover:bg-gray-50 text-center">
              <td className="border px-4 py-2">{sub.user_id}</td>
              <td className="border px-4 py-2">{sub.user_name}</td>
              <td className="border px-4 py-2">{sub.email_id}</td>
              <td className="border px-4 py-2">{sub.course_title}</td>
              <td className="border px-4 py-2 text-blue-600 underline">
                <a href={sub.submission_link} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="border px-4 py-2">{sub.status}</td>
              <td className="border px-4 py-2 flex justify-center gap-2">
                {(sub.status === 'Under Review' || sub.status === 'Rejected') && (
                  <button
                    onClick={() => updateStatus(sub.user_id, sub.course_id, 'Approved')}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  >
                    Approve
                  </button>
                )}
                {(sub.status === 'Under Review' || sub.status === 'Approved') && (
                  <button
                    onClick={() => updateStatus(sub.user_id, sub.course_id, 'Rejected')}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectSubmissions;
