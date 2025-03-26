import React from "react";
import Nav from "./Navigation";
import "../general_styles/subHeader.css";

export default function SubHeader() {
  const studentFunctionalities = [
    "Couselling",
    "Marketplace",
    "ToDO",
    "Claim points",
    "student portal",
    "LMS",
    "Exambank",
  ];

  return (
    <div>
      {" "}
      <div className="subHeader">
        <Nav />
        {/* <ol>
          {studentFunctionalities.map((opt, id) => (
            <li key={id}>{opt}</li>
          ))}
        </ol> */}
      </div>
    </div>
  );
}
