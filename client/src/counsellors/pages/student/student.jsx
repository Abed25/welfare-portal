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
    message: "",
    userName: "",
    registeredEmail: "",
  });

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
    </div>
  );
}
