import React, { useEffect, useState, useContext } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider";
import "../styles/student.css";
import DynamicButton from "./button";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { format } from "date-fns"; // Importing date-fns for formatting

function Requests() {
  const [requests, setRequests] = useState([]);
  const { messages, sendMessage } = useContext(WebSocketContext);
  const { user } = useAuth();
  const [formData, setFormData] = useState({ message: "" });
  const [specifiedUser, setSpecifiedUser] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/submit-form")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ message: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.message) {
      toast.error("Please type a message!");
      return;
    }
    if (!specifiedUser) {
      toast.warn("Please select a student!");
      return;
    }

    sendMessage({
      sender: "counsellor",
      type: "CounsellorRes",
      to: specifiedUser,
      from: user.username,
      response: formData.message,
      timestamp: new Date().toISOString(),
    });

    fetch("http://localhost:5000/api/respond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId: userID, response: formData.message }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Response sent successfully");
      })
      .catch((error) => console.error("Error sending response:", error));

    setFormData({ message: "" });
  };

  // Extract messages and responses for the specified user
  const selectedRequest = requests.find(
    (req) => req.userName === specifiedUser
  );

  const storedMessages = selectedRequest?.messages || [];
  const storedResponses = selectedRequest?.responses || [];

  const newStudentMessages = messages.filter(
    (msg) => msg.type === "studentReq" && msg.userName === specifiedUser
  );

  const newResponses = messages.filter(
    (msg) => msg.type === "CounsellorRes" && msg.to === specifiedUser
  );

  // Build conversation array
  const conversation = [];

  storedMessages.forEach((msg) => {
    conversation.push({
      sender: "student",
      text: msg.text,
      timestamp: msg.timestamp,
    });
  });

  storedResponses.forEach((res) => {
    conversation.push({
      sender: "counsellor",
      text: res.text,
      timestamp: res.timestamp,
    });
  });

  newStudentMessages.forEach((msg) => {
    conversation.push({
      sender: "student",
      text: msg.message,
      timestamp: msg.timestamp,
    });
  });

  newResponses.forEach((msg) => {
    conversation.push({
      sender: "counsellor",
      text: msg.response,
      timestamp: msg.timestamp,
    });
  });

  // Sort by timestamp
  conversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div>
      <div>
        <h2>All Requests</h2>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <ul>
            {requests.map((request, index) => (
              <li
                key={index}
                onClick={() => {
                  setSpecifiedUser(request.userName);
                  setUserID(request._id);
                }}
                style={{ cursor: "pointer" }}
              >
                {request.userName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <div className="chat-container">
          <div className="chat-header">
            <h2>Chat with {specifiedUser}</h2>
          </div>

          <div className="chat-messages">
            {conversation.map((item, index) => (
              <div
                key={index}
                className={`message ${item.sender}`}
                style={{
                  color: item.sender === "counsellor" ? "blue" : "black",
                  alignSelf:
                    item.sender === "counsellor" ? "flex-end" : "flex-start",
                }}
              >
                <strong>{item.sender}:</strong> {item.text} <br />
                <small style={{ fontSize: "0.8rem", color: "gray" }}>
                  {format(new Date(item.timestamp), "dd MMM yyyy, hh:mm a")}
                </small>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chat-form">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
            />
            <DynamicButton name="Send" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Requests;
