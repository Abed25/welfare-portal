import React from "react";
import "../general_styles/landing.css";
import Login from "./login";
import SignUp from "./register";
export default function Landing() {
  return (
    <div className="landing">
      <div className="welcoming">
        <h1 className="landing">Student welfare center</h1>
      </div>
      <div className="auth">Pictures</div>
    </div>
  );
}
