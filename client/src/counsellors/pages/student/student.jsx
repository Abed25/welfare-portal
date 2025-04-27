import React, { useState, useEffect, useContext } from "react";
import DynamicButton from "../../components/button";
import "../../styles/student.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../../context/WebSocketProvider";
import { useAuth } from "../../../context/AuthProvider";
import { format } from "date-fns"; // Import date-fns for formatting timestamps
import QuotesCarousel from "../../components/QuotesCarousel";

const api = import.meta.env.VITE_API_BASE_URL;

export default function Student() {
  const { user } = useAuth();
  const { sendMessage, messages } = useContext(WebSocketContext);
  const [formData, setFormData] = useState({ message: "" });
  const [requests, setRequests] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    fetch(`${api}/submit-form`)
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
      timestamp: new Date().toISOString(), // Adding timestamp
    };

    sendMessage({ sender: "student", type: "studentReq", ...updatedForm });

    toast.success("Message sent!");
    setFormData({ message: "" });
  };

  const filteredMessages = requests
    .filter((req) => req.userName === user.username)
    .flatMap((req) =>
      req.messages.map((m) => ({ text: m.text, timestamp: m.timestamp }))
    );

  const filteredResponses = requests
    .filter((req) => req.userName === user.username)
    .flatMap((req) =>
      req.responses.map((r) => ({ text: r.text, timestamp: r.timestamp }))
    );

  const newStudentMessages = messages.filter(
    (msg) => msg.type === "studentReq" && msg.userName === user.username
  );

  const newResponses = messages.filter(
    (msg) => msg.type === "CounsellorRes" && msg.to === user.username
  );

  // Combine stored and real-time messages
  const allMessages = [
    ...filteredMessages.map((msg) => ({
      sender: "student",
      text: msg.text,
      timestamp: msg.timestamp,
    })),
    ...filteredResponses.map((msg) => ({
      sender: "counsellor",
      text: msg.text,
      timestamp: msg.timestamp,
    })),
    ...newStudentMessages.map((msg) => ({
      sender: "student",
      text: msg.message,
      timestamp: msg.timestamp || new Date().toISOString(),
    })),
    ...newResponses.map((msg) => ({
      sender: "counsellor",
      text: msg.response,
      timestamp: msg.timestamp || new Date().toISOString(),
    })),
  ];

  // Sort all messages by timestamp (ascending order)
  allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div>
      <DynamicButton
        name={openChat ? "Close Chat" : "Open chat"}
        title="Open chat with counsellor"
        click={() => {
          setOpenChat(!openChat);
          !openChat &&
            toast.success("You are now in a chat section with a counsellor");
          openChat && toast.success("Closing chat...");
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          padding: "10px 20px",
          background: "#007BFF",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      />

      <div>{!openChat && <QuotesCarousel />}</div>
      {openChat && (
        <>
          <div className="chat-container">
            <div className="chat-header">
              <h2>Chat with Counsellor</h2>
            </div>
            <div className="chat-messages">
              {/* Map through the sorted conversation */}
              {allMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <small style={{ fontSize: "0.8rem", color: "gray" }}>
                    {format(new Date(msg.timestamp), "dd MMM yyyy, hh:mm a")}
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
        </>
      )}
    </div>
  );
}
