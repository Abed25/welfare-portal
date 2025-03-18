import React, { useState, useEffect } from "react";
import "../../styles/counsellor.css";
import DynamicButton from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export default function Counsellor() {
  const [expandedItems, setExpandedItems] = useState({}); // Stores which items are expanded
  const [requests, setRequests] = useState([]);

  // Fetch form data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/submit-form")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleView = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the clicked item only
    }));
  };

  const buttonStyle = {
    position: "absolute",
    top: "10px",
    right: "40px",
  };

  return (
    <div className="containerCounsellor">
      <DynamicButton
        name="Feeds"
        notify={true}
        value={0}
        style={{ ...buttonStyle, right: "150px" }}
      />
      <DynamicButton
        name="Request"
        style={buttonStyle}
        notify={true}
        click={() => alert("Request")}
        value={4}
      />
      <h2 style={{ textAlign: "center" }}>Student Requests</h2>

      {requests.map((request, id) => (
        <div
          key={id}
          className={
            expandedItems[id] ? "studentRequestV2" : "studentRequestV1"
          }
        >
          <FontAwesomeIcon
            className="dropDown"
            icon={expandedItems[id] ? faCircleChevronUp : faCircleChevronDown}
            onClick={() => handleView(id)}
          />
          <h4>Name: {request.name}</h4>
          <p>{request.email}</p>
          <p>{request.message}</p>
          <div className="respondContainer">
            <form className="response">
              <p>Give a response:</p>
              <textarea></textarea>
              <DynamicButton
                name="Send"
                style={{
                  margin: "10px auto",
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
