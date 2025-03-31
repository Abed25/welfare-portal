import React, { useState } from "react";
import { db } from "../../../firebase"; // Ensure firebase.js is configured
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add tasks.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "events"), {
        taskName,
        description,
        duration: parseInt(duration, 10), // Convert to number
        status,
        userId: user.uid, // Store the logged-in user's ID
        createdAt: new Date(), // Optional: Timestamp for sorting
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Task added successfully!");

      // Reset form fields
      setTaskName("");
      setDescription("");
      setDuration("");
      setStatus(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add task.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} style={{ margin: "60px 10% 10px 10%" }}>
        <h2 style={{ textAlign: "center" }}>Add an activity</h2>
        <label>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        ></textarea>
        <label>Duration (hours):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />

        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        >
          <option value={false}>Undone</option>
          <option value={true}>Done</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;
