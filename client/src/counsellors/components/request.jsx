import React, { useEffect, useState, useContext } from "react";
import { WebSocketContext } from "../../context/WebSocketProvider";
import "../styles/student.css";
import DynamicButton from "./button";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";

function Requests() {
  const [requests, setRequests] = useState([]); // default to an empty array
  const { messages, sendMessage } = useContext(WebSocketContext);
  const { user } = useAuth();
  const [formData, setFormData] = useState({ message: "" });
  const [specifiedUser, setSpecifiedUser] = useState("student");
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
    sendMessage({
      sender: "counsellor",
      type: "CounsellorRes",
      to: specifiedUser,
      from: user.username,
      response: formData.message,
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

    toast.success("Message sent!");
    setFormData({ message: "" });
  };

  const filteredMessages = requests
    .filter((req) => req.userName === specifiedUser)
    .flatMap((req) => req.messages);

  const filteredResponses = requests
    .filter((req) => req.userName === specifiedUser)
    .flatMap((req) => req.responses);

  //This applies for websocket
  const newStudentMessages = messages.filter(
    (msg) => msg.type === "studentReq" && msg.userName === specifiedUser
  );

  const newResponses = messages.filter(
    (msg) => msg.type === "CounsellorRes" && msg.to === specifiedUser
  );

  // Combine stored conversation
  // Combine stored conversation
  const conversation = [];

  // Add stored messages
  filteredMessages.forEach((msg) => {
    conversation.push({
      sender: "student",
      text: msg,
      timestamp: msg.timestamp,
    });
  });

  filteredResponses.forEach((res) => {
    conversation.push({
      sender: "counsellor",
      text: res,
      timestamp: res.timestamp,
    });
  });

  // Add live messages
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
                    item.sender === "counsellor" ? " flex-end" : "flex-start",
                }}
              >
                <strong>{item.sender}:</strong> {item.text}
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
