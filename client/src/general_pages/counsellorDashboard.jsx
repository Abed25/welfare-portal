import React from "react";
import SubHeader from "../general_components/SubHeader";
import "../general_styles/CounselorDash.css";

const CounsellorDashboard = () => {
  return (
    <div>
      <SubHeader />
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <header className="dashboard-header">
            <h1>Counselor Dashboard</h1>
            <p>Welcome back! Here’s a quick overview of your activity.</p>
          </header>

          <section className="dashboard-cards">
            <div className="dashboard-card card-indigo">
              <h2>Active Chats</h2>
              <p>View and respond to ongoing student conversations.</p>
            </div>

            <div className="dashboard-card card-green">
              <h2>Upcoming Sessions</h2>
              <p>Check your scheduled counseling sessions.</p>
            </div>

            <div className="dashboard-card card-pink">
              <h2>Student Feedback</h2>
              <p>Review ratings and comments from previous sessions.</p>
            </div>
          </section>

          <section className="dashboard-actions">
            <h2>Quick Actions</h2>
            <ul>
              <li>Start a new session</li>
              <li>View student profiles</li>
              <li>Log session notes</li>
              <li>Generate session summary</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
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
