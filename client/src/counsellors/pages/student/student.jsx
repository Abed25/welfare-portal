import React, { useState, useContext } from "react";
import DynamicButton from "../../components/button";
import "../../styles/student.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../../context/WebSocketProvider";

export default function Student() {
  const { sendMessage } = useContext(WebSocketContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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

    sendMessage({ sender: "student", type: "studentReq", ...formData });

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
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
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}
