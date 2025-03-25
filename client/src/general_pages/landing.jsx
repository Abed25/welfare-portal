import React from "react";
import "../general_styles/landing.css";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/system.avif";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="welcoming">
        <section className="view1">
          <section className="view2">
            <h1>Student welfare portal</h1>
            <button onClick={() => navigate("/signup")}>Get started</button>
            <button onClick={() => navigate("/login")}>Sign in</button>
          </section>
        </section>
        {/* <h1 className="landing">Student welfare center</h1> */}
      </div>
      <div className="auth">
        {/* <img
          src={image1}
          alt="syystem image"
          style={{ width: "50%", float: "left" }}
        />
        <p>
          A modern solution for managing student affairs efficiently. Access
          welfare services, stay updated, and connect with support systems
          seamlessly.
        </p>
        <h2>Why Use Our Portal?</h2>
        <ul>
          <li>📌 Easy access to student welfare services</li>
          <li>📌 Secure and efficient management of student records</li>
          <li>📌 Real-time updates and notifications</li>
          <li>📌 Connect with student support teams effortlessly</li>
        </ul>
        <p>
          Join thousands of students who are streamlining their welfare needs
          through our platform. Register today and experience a hassle-free way
          to stay connected!
        </p> */}
      </div>
    </div>
  );
}
