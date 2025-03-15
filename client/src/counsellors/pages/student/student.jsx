import React from "react";
import DynamicButton from "../../components/button";
import "../../styles/student.css";

export default function Student() {
  const buttonContainerStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
  };
  const buttonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px 10px",
  };
  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="responsesDiv" style={buttonContainerStyle}>
        <DynamicButton
          name="Responses"
          style={buttonStyle}
          notify={true}
          value={0}
          click={() => alert("Respond")}
        />
      </div>
      <h2>Talk to counsellor</h2>
      <div className="InnerContainer">
        <form>
          <input type="text" placeholder="Type your name" required />
          <input
            type="text"
            placeholder="Enter your admission number"
            required
          />
          <input type="text" placeholder="Problem title" required />
          <label>Explain your isues if confortable</label>
          <textarea required></textarea>
          <DynamicButton
            name="Submit"
            style={{ height: "30px", fontSize: "20px" }}
          />
          <label className="ads">
            I don't feel comfortable i{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              prefer a meeting
            </span>{" "}
          </label>
        </form>
      </div>
    </div>
  );
}
