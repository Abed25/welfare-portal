import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../general_styles/Navigation.css";
import HamburgerMenu from "./HamburgerMenu";

export default function Nav(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const studentFunctionalities = [
    "Counselling",
    "Marketplace",
    "ToDO",
    "Claim points",
    "student portal",
    "LMS",
    "Exambank",
  ];
  return (
    <div className="nav">
      <ul className={menuOpen ? "view" : null}>
        {studentFunctionalities.map((opt, id) => (
          <NavLink key={id} to={`/${opt.toLowerCase()}`}>
            {opt}
          </NavLink>
        ))}
      </ul>

      <HamburgerMenu click={handleClick} />
    </div>
  );
}
