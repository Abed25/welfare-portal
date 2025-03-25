import React from "react";
import "../general_styles/head.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Head() {
  const { user, role, logout } = useAuth();
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const ContactDetails = () => {
    return (
      <div className="contact">
        <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
          Contact Information
        </h4>
        <p>Email: {user.email}</p>
        <p>Role: {role}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  return (
    <div className="head">
      <label htmlFor="head">Welfare</label>
      {user && (
        <div className="contactContainer">
          <FontAwesomeIcon
            className={showContact ? "userIconActive" : "userIcon"}
            icon={faUser}
            onClick={() => setShowContact(!showContact)}
            style={{ cursor: "pointer" }}
          />
          {showContact && <ContactDetails />}
        </div>
      )}
    </div>
  );
}
