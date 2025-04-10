import React, { useState, useEffect, useContext } from "react";
import DynamicButton from "../../components/button";
import "../../styles/student.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../../context/WebSocketProvider";
import { useAuth } from "../../../context/AuthProvider";

export default function Student() {
  const { user } = useAuth();
  const { sendMessage, messages } = useContext(WebSocketContext);
  const [formData, setFormData] = useState({ message: "" });
  const [requests, setRequests] = useState([]);

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

    const updatedForm = {
      ...formData,
      userName: user.username,
      registeredEmail: user.email,
    };

    sendMessage({ sender: "student", type: "studentReq", ...updatedForm });

    toast.success("Message sent!");
    setFormData({ message: "" });
  };

  const filteredMessages = requests
    .filter((req) => req.userName === user.username)
    .flatMap((req) => req.messages);

  const filteredResponses = requests
    .filter((req) => req.userName === user.username)
    .flatMap((req) => req.responses);

  const newStudentMessages = messages.filter(
    (msg) => msg.type === "studentReq" && msg.userName === user.username
  );

  const newResponses = messages.filter(
    (msg) => msg.type === "CounsellorRes" && msg.to === user.username
  );

  // Combine stored conversation
  const conversation = [];
  const maxLength = Math.max(filteredMessages.length, filteredResponses.length);

  for (let i = 0; i < maxLength; i++) {
    if (filteredMessages[i]) {
      conversation.push({ sender: "student", text: filteredMessages[i] });
    }
    if (filteredResponses[i]) {
      conversation.push({ sender: "counsellor", text: filteredResponses[i] });
    }
  }

  return (
    <div>
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with Counsellor</h2>
        </div>
        <div className="chat-messages">
          {/* Stored messages */}
          {conversation.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}

          {/* Real-time student messages (fade after refresh) */}
          {newStudentMessages.map((msg, index) => (
            <div
              key={`realtime-student-${index}`}
              className="message student new"
            >
              <p>{msg.message}</p>
            </div>
          ))}

          {/* Real-time counsellor responses (fade after refresh) */}
          {newResponses.map((msg, index) => (
            <div key={`new-${index}`} className="message counsellor new">
              <p>{msg.response}</p>
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

      <div className="feedback-section">
        <h3>Give Feedback</h3>
        <label htmlFor="title">
          On a scale of 1 - 10, how do you rate the assistance level?
        </label>
        <input type="range" min="1" max="10" />

        <label htmlFor="comment">
          Where should we improve in our service delivery?
        </label>
        <textarea placeholder="Your suggestions..." />
      </div>
    </div>
  );
}
