import React, { useState } from "react";
import "../general_styles/HamburgerMenu.css";

const HamburgerMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    props.click();
  };

  return (
    <div className="menu">
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
