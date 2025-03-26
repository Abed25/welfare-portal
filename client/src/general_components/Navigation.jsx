import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../general_styles/Navigation.css";
import HamburgerMenu from "./HamburgerMenu";
import { useAuth } from "../context/AuthProvider";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useAuth();
  const [userFunctions, setUserFunctions] = useState([]);

  useEffect(() => {
    const functionalities = {
      student: [
        "Counselling",
        "Marketplace",
        "ToDO",
        "Claim points",
        "student portal",
        "LMS",
        "Exambank",
      ],
      counsellor: ["Counselling", "Feeds history", "ToDO", "Marketplace"],
      default: ["Home", "About", "Login"],
    };

    setUserFunctions(functionalities[role] || functionalities.default);
  }, [role]);

  const handleClick = () => setMenuOpen(!menuOpen);

  return (
    <div className="nav">
      <ul className={menuOpen ? "view" : null}>
        {userFunctions.map((opt, id) => (
          <NavLink key={id} to={`/${opt.toLowerCase()}`}>
            {opt}
          </NavLink>
        ))}
      </ul>
      <HamburgerMenu click={handleClick} />
    </div>
  );
}
