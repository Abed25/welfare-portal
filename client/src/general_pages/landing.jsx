import React from "react";
import "../general_styles/landing.css";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/system.avif";
import image2 from "../assets/class.jpg";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { useAuth } from "../context/AuthProvider";
export default function Landing() {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="welcoming">
        <section className="view1">
          <section className="view2">
            <h1>Student welfare portal</h1>

            {user ? (
              <div>
                <button
                  onClick={() =>
                    navigate(
                      role === "student"
                        ? "/student-dashboard"
                        : role === "counsellor"
                        ? "/counsellor-dashboard"
                        : "/login"
                    )
                  }
                  className="landingBtns"
                >
                  Dashboard
                </button>
                <button onClick={logout} className="landingBtns">
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => navigate()} className="landingBtns">
                  Get started
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="landingBtns"
                >
                  Sign in
                </button>
              </div>
            )}
          </section>
        </section>
        {/* <h1 className="landing">Student welfare center</h1> */}
      </div>
      <div className="auth">
        <img
          src={image2}
          alt="system image"
          style={{
            display: "block",
            margin: "auto",
            position: "absolute",
            width: "90%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
