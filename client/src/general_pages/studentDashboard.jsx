import React from "react";
import { NavLink } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div style={styles.container}>
      <ol style={{ textAlign: "left" }}>
        <li>Couselling</li>
        <li>Marketplace</li>
        <li>ToDO</li>
        <li>Claim points</li>
        <li>student portal</li>
        <li>LMS</li>
        <li>Exam bank</li>
      </ol>
      <h1 style={styles.heading}>Student Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your activities.</p>
      <NavLink to="/" style={styles.link}>
        Go to Home
      </NavLink>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    color: "#4A90E2",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 16px",
    background: "#4A90E2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default StudentDashboard;
