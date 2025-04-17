import React from "react";
import "../general_styles/subfooter.css";
export default function SubFooter() {
  return (
    <div className="subfooter">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Student Welfare Portal</h3>
          <p>
            Empowering students with essential services, resources, and support
            to enhance campus life and personal development.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/counselling">Counseling</a>
            </li>
            <li>
              <a href="/Forum">Forum</a>
            </li>
            <li>
              <a href="/todo">Todo</a>
            </li>
            <li>
              <a href="/marketplace">Marketplace</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
