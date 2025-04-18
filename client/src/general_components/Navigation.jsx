import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../general_styles/Navigation.css";
import HamburgerMenu from "./HamburgerMenu";
import { useAuth } from "../context/AuthProvider";
import Dropdown from "./Dropdown";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useAuth();
  const [userFunctions, setUserFunctions] = useState([]);

  const functionalities = {
    student: ["Counselling", "Marketplace", "ToDO", "Forum", "Claim points"],
    counsellor: ["Counselling", "Feeds history", "ToDO", "Marketplace"],
    schoolLinks: [
      { label: "Student Portal", path: "http://portal.mksu.ac.ke/" },
      { label: "LMS", path: "https://elearning.mksu.ac.ke/mksu.lms/" },
      { label: "Exambank", path: "http://ir.mksu.ac.ke/handle/123456780/187" },
    ],
    default: ["Home", "About", "Login"],
  };

  useEffect(() => {
    setUserFunctions(functionalities[role] || functionalities.default);
  }, [role]);

  const handleClick = () => setMenuOpen(!menuOpen);

  return (
    <div className="nav">
      <ul className={menuOpen ? "view" : null}>
        <NavLink
          to={
            role === "student"
              ? "/student-dashboard"
              : role === "counsellor"
              ? "/counsellor-dashboard"
              : "/"
          }
        >
          Home
        </NavLink>

        {userFunctions.map((opt, id) => (
          <NavLink key={id} to={`/${opt.toLowerCase().replace(/\s+/g, "-")}`}>
            {opt}
          </NavLink>
        ))}
        {role === "student" && (
          <Dropdown options={functionalities.schoolLinks} />
        )}
      </ul>
      <HamburgerMenu click={handleClick} />
    </div>
  );
}
