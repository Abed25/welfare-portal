import React from "react";
import "../general_styles/footer.css";
export default function Footer() {
  return (
    <div className="footer">
      &copy; {new Date().getFullYear()} superDev | Student Welfare Portal | All
      rights reserved.
    </div>
  );
}
