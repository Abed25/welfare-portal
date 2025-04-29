import React from "react";
import "../general_styles/spinner.css";

function LoadingSpinner() {
  return (
    <div className="spinner">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default LoadingSpinner;
