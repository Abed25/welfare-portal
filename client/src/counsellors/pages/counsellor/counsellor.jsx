import React, { useState, useEffect, useContext } from "react"; // ✅ Add useContext
import "../../styles/counsellor.css";
import DynamicButton from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { WebSocketContext } from "../../../context/WebSocketProvider"; // ✅ Import WebSocket Context
import { toast } from "react-toastify";

export default function Counsellor() {
  const { messages } = useContext(WebSocketContext); // ✅ Use WebSocketContext
  const [expandedItems, setExpandedItems] = useState({});
  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState({});

  // Fetch form data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/submit-form")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // ✅ Update requests when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setRequests((prevRequests) => [...prevRequests, ...messages]);
    }
  }, [messages]);

  const handleView = (id) => {
    setExpandedItems((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}), // Close all other expanded divs
      [id]: !prev[id],
    }));
  };

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleResponseSubmit = (id) => {
    const responseMessage = responses[id] || "";

    if (!responseMessage.trim()) {
      toast.error("Response cannot be empty!");
      return;
    }

    fetch("http://localhost:5000/api/respond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId: id, response: responseMessage }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Response sent successfully");
        setResponses((prev) => ({ ...prev, [id]: "" })); // Clear the response field
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id
              ? {
                  ...req,
                  responses: [...(req.responses || []), responseMessage],
                }
              : req
          )
        );
      })
      .catch((error) => console.error("Error sending response:", error));
  };

  return (
    <div className="containerCounsellor">
      <DynamicButton
        name="Feeds"
        notify={true}
        value={0}
        style={{ position: "absolute", top: "10px", right: "150px" }}
      />
      <DynamicButton
        name="Request"
        style={{ position: "absolute", top: "10px", right: "40px" }}
        notify={true}
        value={requests.length}
      />
      <h2 style={{ textAlign: "center" }}>Student Requests</h2>

      {requests.map((request) => (
        <div
          key={request._id}
          className={
            expandedItems[request._id] ? "studentRequestV2" : "studentRequestV1"
          }
        >
          <FontAwesomeIcon
            className="dropDown"
            icon={
              expandedItems[request._id]
                ? faCircleChevronUp
                : faCircleChevronDown
            }
            onClick={() => handleView(request._id)}
          />
          <h4>Name: {request.name}</h4>
          <p>{request.email}</p>
          <p>{request.message}</p>

          {expandedItems[request._id] && (
            <div className="respondContainer">
              <h5>Previous Responses:</h5>
              <ul>
                {request.responses && request.responses.length > 0 ? (
                  request.responses.map((res, index) => (
                    <li key={index}>{res}</li>
                  ))
                ) : (
                  <p>No responses yet</p>
                )}
              </ul>

              <form
                className="response"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleResponseSubmit(request._id);
                }}
              >
                <p>Give a response:</p>
                <textarea
                  value={responses[request._id] || ""}
                  onChange={(e) =>
                    handleResponseChange(request._id, e.target.value)
                  }
                ></textarea>
                <DynamicButton
                  name="Send"
                  type="submit"
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
          )}
        </div>
      ))}
    </div>
  );
}
