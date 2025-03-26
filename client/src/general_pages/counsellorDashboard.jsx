import React from "react";
import SubHeader from "../general_components/SubHeader";

const CounsellorDashboard = () => {
  return (
    <div>
      <SubHeader />
      <h1>Counsellor dashboard</h1>
    </div>
  );
};

export default CounsellorDashboard;
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    color: "#4A90E2",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 16px",
    background: "#4A90E2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};
