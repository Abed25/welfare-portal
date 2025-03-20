import React from "react";
import "../general_styles/landing.css";
import Login from "./login";
import SignUp from "./register";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="welcoming">
        <section className="view1">
          <h1>Student welfare portal</h1>
          <button onClick={() => navigate("/signup")}>Get started</button>
          <button onClick={() => navigate("/login")}>Sign in</button>
        </section>
        {/* <h1 className="landing">Student welfare center</h1> */}
      </div>
      <div className="auth">Pictures</div>
    </div>
  );
}
