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
  const [formData, setFormData] = useState({
    message: "",
    userName: "",
    registeredEmail: "",
  });
  const [requests, setRequests] = useState([]);

  // Fetch form data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/submit-form")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked!"); // Debugging

    if (!formData.message) {
      toast.error("All fields are required!");
      return;
    }

    // Create an updated object without modifying state first
    const updatedForm = {
      ...formData,
      userName: user.username,
      registeredEmail: user.email,
    };

    sendMessage({ sender: "student", type: "studentReq", ...updatedForm });

    toast.success("Message sent successfully!");
    setFormData({
      message: "",
      userName: "",
      registeredEmail: "",
    });
  };

  return (
    <div className="container">
      <DynamicButton
        name="Responses"
        style={{ position: "absolute", top: "10px", right: "40px" }}
        notify={true}
        value={0}
      />
      <h2>Talk to Counsellor</h2>
      <div className="InnerContainer">
        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Express your concerns..."
          />
          <DynamicButton
            name="Submit"
            type="submit"
            style={{ height: "30px", fontSize: "20px" }}
          />
        </form>
      </div>
      <h4>Counsellors Views</h4>
      <ul>
        {requests.length > 0 ? (
          requests
            .filter((req) => req.userName === user.username) // ✅ Only show messages for the logged-in user
            .flatMap((req) => req.responses) // ✅ Get all responses for that user
            .map((response, index) => <li key={index}>{response}</li>)
        ) : (
          <>
            <p>No message yet</p>
            {console.log(requests)}
          </>
        )}

        {messages
          .filter(
            (msg) => msg.type === "CounsellorRes" && msg.to === user.username
          ) // ✅ Only studentReq messages
          .map((msg, index) => (
            <li key={index} style={{ color: "blue" }}>
              {" "}
              {`${msg.response}(new)`}
            </li>
          ))}
      </ul>
    </div>
  );
}
