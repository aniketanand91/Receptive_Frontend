import React, { useState } from "react";
import { API_BASE_URL } from '../api/apiactions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

const ProjectSubmissionPage = () => {
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("Not Submitted");
  const { loginResp } = useSelector(({ auth }) => ({ loginResp: auth.loginResp }), shallowEqual);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!googleDriveLink) {
      alert("Please provide a Google Drive link.");
      return;
    }

    try {
      // Send the POST request
      const response = await fetch(`${API_BASE_URL}/users/ProjectSubmission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: loginResp?.userInfo?.user_ID || 'NA', // Replace with dynamic user ID if needed
          link: googleDriveLink,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus("Waiting for Evaluation");
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

    setGoogleDriveLink(""); // Clear the input field
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.containerh1}>Project Submission</h1>

      {/* Assignment Details */}
      <div style={styles.assignmentDetails}>
        <h2>Course: Business Basics</h2>
        <h3>Assignment: Submit a documentation of concepts learned through this course in business aspects.</h3>
      </div>

      {/* Submission Form */}
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
