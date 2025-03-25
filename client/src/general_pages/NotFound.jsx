import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NotFound = () => {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center" }}>
      {console.log({ user })}
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <NavLink
        to={
          user?.role === "student"
            ? "/student-dashboard"
            : user?.role === "counsellor"
            ? "/counsellor-dashboard"
            : "/"
        }
      >
        {" "}
        Go back Home{" "}
      </NavLink>
    </div>
  );
};

export default NotFound;
