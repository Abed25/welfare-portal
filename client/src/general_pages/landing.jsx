import React, { useEffect, useState } from "react";
import "../general_styles/landing.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Landing() {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDoneTyping(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing">
      <div className="welcoming">
        <section className="view1">
          <section className="view2">
            <h1>Student Welfare Portal</h1>
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
                <button
                  onClick={() => navigate("/register")}
                  className="landingBtns"
                >
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
      </div>

      <div className="auth">
        <div className={`typewriter-container ${doneTyping ? "typed" : ""}`}>
          <span className="colorful-text">
            {/* Behind this text i want a shining stars or sun */}
            Empowering minds to shape the future.
          </span>
        </div>
      </div>
    </div>
  );
}
