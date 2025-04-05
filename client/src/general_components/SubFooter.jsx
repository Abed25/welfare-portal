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
              <a href="/counseling">Counseling</a>
            </li>
            <li>
              <a href="/accommodation">Accommodation</a>
            </li>
            <li>
              <a href="/bursary">Bursary Support</a>
            </li>
            <li>
              <a href="/health">Health Services</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
