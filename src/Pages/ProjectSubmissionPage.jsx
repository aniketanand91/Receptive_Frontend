import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../api/apiactions';
import { useSelector, shallowEqual } from 'react-redux';
import { getLocalStorage } from "../Utils/storageutility";
import { accessTokenKey } from "../constants/storageconstants";
import { useNavigate, useParams } from 'react-router-dom';

const ProjectSubmissionPage = () => {
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("Not Submitted");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);

  const userId = loginResp?.userInfo?.user_ID || 'NA';
  const { courseId } = useParams();
  

  useEffect(() => {
    const fetchStatus = async () => {
      const token = getLocalStorage(accessTokenKey);
      try {
        const response = await fetch(`${API_BASE_URL}/users/getProjectSubmissionDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            course_id: courseId,
            user_id: userId
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setSubmissionStatus(data[0].status);
            setIsSubmitted(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch submission status:", error);
      }
    };

    fetchStatus();
  }, [courseId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!googleDriveLink) {
      alert("Please provide a Google Drive link.");
      return;
    }

    try {
      const token = getLocalStorage(accessTokenKey);
      const response = await fetch(`${API_BASE_URL}/users/ProjectSubmission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          link: googleDriveLink,
          course_id: courseId
        }),
      });

      if (response.ok) {
        setSubmissionStatus("Under Review");
        setIsSubmitted(true);
        alert("Project submitted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Submission failed: ${errorData.message || "Unknown error"}`);
        setSubmissionStatus("Submission Failed");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setSubmissionStatus("Submission Failed");
    }

    setGoogleDriveLink("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.containerh1}>Project Submission</h1>

      <div style={styles.assignmentDetails}>
        <h3>Assignment: Submit a documentation of concepts learned through this course.</h3>
      </div>

      {/* Conditionally render submission form */}
      {!isSubmitted || submissionStatus === "Rejected" ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="googleDriveLink" style={styles.label}>
            Google Drive Link:
          </label>
          <input
            type="url"
            id="googleDriveLink"
            name="googleDriveLink"
            placeholder="https://drive.google.com/your-link"
            value={googleDriveLink}
            onChange={(e) => setGoogleDriveLink(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      ) : (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          You have already submitted your project. Status: {submissionStatus}
        </p>
      )}

      {/* Submission Status */}
      <div style={styles.status}>
        <h3>Status: {submissionStatus}</h3>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "'Arial', sans-serif",
    lineHeight: "1.6",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
  containerh1: {
    marginBottom: "20px",
    fontSize: "30px",
  },
  assignmentDetails: {
    marginBottom: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#e3f2fd",
    color: "#0d47a1",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  label: {
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  status: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f1f8e9",
    color: "#2e7d32",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
};

export default ProjectSubmissionPage;
