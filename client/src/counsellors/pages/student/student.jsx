import React, { useState, useContext } from "react";
import DynamicButton from "../../components/button";
import "../../styles/student.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../../context/WebSocketProvider";
import { useAuth } from "../../../context/AuthProvider";

export default function Student() {
  const { user } = useAuth();
  const { sendMessage } = useContext(WebSocketContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    registeredEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked!"); // Debugging

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    // Create an updated object without modifying state first
    const updatedForm = {
      ...formData,
      registeredEmail: user.email,
    };

    sendMessage({ sender: "student", type: "studentReq", ...updatedForm });

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "", registeredEmail: "" });
  };

  return (
    <div className="container">
      <h2>Talk to Counsellor</h2>
      <div className="InnerContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type your name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
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
    </div>
  );
}
