import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { accessTokenKey } from '../constants/storageconstants';
import { getLocalStorage } from '../Utils/storageutility';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../api/apiactions";


function Button({ children, variant = 'default', className = '', ...props }) {
  const baseStyles = 'px-4 py-2 rounded text-white font-semibold text-sm transition duration-200';
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700',
    destructive: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700',
  };
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const finalClass = `${baseStyles} ${variants[variant] || variants.default} ${props.disabled ? disabledStyles : ''} ${className}`;

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
}

export default function RequestApproval() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getLocalStorage(accessTokenKey);
        const response = await axios.get(`${API_BASE_URL}/api/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAction = async (courseId, newStatus) => {
    const token = getLocalStorage(accessTokenKey);
    const payload = { course_id: courseId, is_live: newStatus };

    try {
      await axios.post('http://localhost:3000/api/approve-course', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = courses.map((course) =>
        course.course_id === courseId ? { ...course, is_live: newStatus } : course
      );
      setCourses(updated);
    } catch (error) {
      console.error('Error updating course status:', error);
      alert('Failed to update course status');
    }
  };

  const getStatusBadge = (isLive) => {
    let label = '';
    let color = '';

    switch (isLive) {
      case 0:
        label = 'Pending';
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 1:
        label = 'Live';
        color = 'bg-green-100 text-green-800';
        break;
      case 2:
        label = 'Declined';
        color = 'bg-red-100 text-red-800';
        break;
      default:
        label = 'Unknown';
        color = 'bg-gray-200 text-gray-800';
    }

    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${color}`}>
        {label}
      </span>
    );
  };

  const renderButtons = (course) => {
    const { course_id, is_live } = course;

    if (is_live === 0) {
      // Show both Approve and Decline
      return (
        <>
          <Button variant="success" onClick={() => handleAction(course_id, 1)}>
            Approve
          </Button>
          <Button variant="destructive" onClick={() => handleAction(course_id, 2)}>
            Decline
          </Button>
        </>
      );
    } else if (is_live === 1) {
      // Only show Decline
      return (
        <Button variant="destructive" onClick={() => handleAction(course_id, 2)}>
          Decline
        </Button>
      );
    } else if (is_live === 2) {
      // Only show Approve (for reconsideration)
      return (
        <Button variant="success" onClick={() => handleAction(course_id, 1)}>
          Approve
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Course Management Panel</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300 rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-4 border-b">#</th>
                <th className="p-4 border-b">Uploader</th>
                <th className="p-4 border-b">Course Title</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={course.course_id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{index + 1}</td>
                  <td className="p-4 border-b">{course.uploader_name}</td>
                  <td className="p-4 border-b text-blue-600">
                    <Link to={`/lectures/${course.course_id}`}>{course.title}</Link>
                  </td>
                  <td className="p-4 border-b">₹{course.price}</td>
                  <td className="p-4 border-b">{getStatusBadge(course.is_live)}</td>
                  <td className="p-4 border-b">
                    <div className="flex justify-center gap-2">
                      {renderButtons(course)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
