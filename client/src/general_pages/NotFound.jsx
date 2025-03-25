import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NotFound = () => {
  const { user, role } = useAuth(); // Extract role separately

  return (
    <div style={{ textAlign: "center" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <NavLink
        to={
          role === "student"
            ? "/student-dashboard"
            : role === "counsellor"
            ? "/counsellor-dashboard"
            : "/"
        }
      >
        Go back Home
      </NavLink>
    </div>
  );
};

export default NotFound;
