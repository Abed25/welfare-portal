import React from "react";
import { NavLink } from "react-router-dom";
import SubHeader from "../general_components/SubHeader";

const StudentDashboard = () => {
  return (
    <div>
      <SubHeader />
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
