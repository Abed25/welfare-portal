import React, { useState } from "react";
import axios from "axios";
import DynamicButton from "../../components/button";
import "../../styles/student.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Student() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true); // Show loading state
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit-form",
        formData
      );
      toast.success(response.data.message); // Show success message

      // Clear form
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.error || "Something went wrong!"}`
        );
      } else {
        toast.error("Network error. Check your connection.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
  };
  const buttonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px 10px",
  };
  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="responsesDiv" style={buttonContainerStyle}>
        <DynamicButton
          name="Responses"
          style={buttonStyle}
          notify={true}
          value={0}
          click={() => alert("Respond")}
        />
      </div>
      <h2>Talk to counsellor</h2>
      <div className="InnerContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type your name"
            // required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Please enter your email"
            // required
          />

          <label>Explain your isues if confortable</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Express your concerns here..."
            // required
          />
          <DynamicButton
            name={loading ? "Submitting..." : "Submit"}
            type="submit"
            style={{ height: "30px", fontSize: "20px" }}
          />

          {/* Skip functionality */}
          <label className="ads">
            I don't feel comfortable i{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              prefer a meeting
            </span>{" "}
          </label>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
}
