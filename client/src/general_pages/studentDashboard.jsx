import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SubHeader from "../general_components/SubHeader";
import SubFooter from "../general_components/SubFooter";
import "../general_styles/studentDash.css";
import { useAuth } from "../context/AuthProvider";
import ImageUploader from "../general_components/ImageUploader";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="Dashboard">
      <SubHeader />
      <div className="profile">
        {/* Considered importing image container */}
        <div className="outterImageContainer">
          <ImageUploader />
        </div>
        <div className="AboutProfile">
          <h2 className="dashboard-heading">Welcome back, {user.username}!</h2>
          <p className="dashboard-intro">
            Manage your student welfare with ease.
          </p>
        </div>
      </div>

      <div className="welcome-section">
        <h2>Welfare Overview</h2>
        <p>
          Track your welfare requests, new marketplace features and manage day
          activities.
        </p>
      </div>

      <div className="dashboard-cards">
        {/* <NavLink to="/financial-assistance" className="dashboard-card">
          Financial Assistance
        </NavLink> */}
        <NavLink to="/counselling" className="dashboard-card">
          Counseling & Mental Health
        </NavLink>
        <NavLink to="/emergency-support" className="dashboard-card">
          Emergency Support
        </NavLink>
        <NavLink to="/marketplace" className="dashboard-card">
          Student Marketplace
        </NavLink>
        <NavLink to="/claim-points" className="dashboard-card">
          Claim Points / Gain streaks
        </NavLink>
        <NavLink to="/forum" className="dashboard-card">
          Forum
        </NavLink>
        <NavLink to="/todo" className="dashboard-card">
          Manage Day activities
        </NavLink>
      </div>

      <div className="announcements">
        <h2>Announcements & Alerts</h2>
        <ul>
          <li>New bursary applications open!</li>
          <li>Upcoming mentorship program: Register now!</li>
          <li>Loan application deadline approaching.</li>
        </ul>
      </div>

      <div className="welfare-status">
        <h2>Welfare Requests & Status</h2>
        <ul>
          <li>
            Scholarship Application - <b>Pending</b>
          </li>
          <li>
            Counseling Session - <b>Approved</b>
          </li>
          <li>
            Emergency Support Request - <b>Rejected</b>
          </li>
        </ul>
      </div>

      <div className="support-section">
        <h2>Support & Help Desk</h2>
        <NavLink to="/live-chat" className="support-link">
          Live Chat
        </NavLink>
        <NavLink to="/faq" className="support-link">
          FAQs
        </NavLink>
        <NavLink to="/contact-welfare" className="support-link">
          Contact Welfare Officers
        </NavLink>
      </div>

      <input
        type="text"
        placeholder="Search services..."
        className="search-bar"
      />
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        Toggle Dark Mode
      </button>
      <SubFooter />
    </div>
  );
};

export default StudentDashboard;
