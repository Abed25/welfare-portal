import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../context/AuthProvider";
import "../styles/output.css"; // Assuming you already have some CSS styles

const FetchTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return; // Ensure the user is logged in
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const tasksData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((task) => task.userId === user.uid); // Filter by logged-in user
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]); // Re-run when the user changes

  // Handle task update
  const handleUpdateTask = async (taskId) => {
    try {
      const taskRef = doc(db, "events", taskId);
      await updateDoc(taskRef, {
        taskName: updatedTaskName,
        description: updatedDescription,
        duration: updatedDuration,
      });
      setEditingTask(null); // Close edit mode after update
      setUpdatedTaskName("");
      setUpdatedDescription("");
      setUpdatedDuration("");
      fetchTasks(); // Re-fetch tasks to get updated data
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, "events", taskId);
      await deleteDoc(taskRef);
      fetchTasks(); // Re-fetch tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div style={{ marginTop: "10px" }}>
      <h2 style={{ textAlign: "center" }}>Task List</h2>
      {/* Incomplete Tasks Section */}
      <div className="task-section" style={{ background: "#FFEEEE" }}>
        <h3 style={{ textAlign: "center" }}>Undone Tasks</h3>
        <ul className="task-list">
          {tasks
            .filter((task) => !task.status)
            .map((task) => (
              <li className="task-item" key={task.id}>
                <strong>{task.taskName}</strong>
                <p>{task.description}</p>
                <p>Duration: {task.duration} hours</p>
                <button
                  className="green"
                  onClick={() => {
                    setEditingTask(task.id);
                    setUpdatedTaskName(task.taskName);
                    setUpdatedDescription(task.description);
                    setUpdatedDuration(task.duration);
                  }}
                >
                  Edit
                </button>
                <button
                  className="red"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
                {editingTask === task.id && (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={updatedTaskName}
                      onChange={(e) => setUpdatedTaskName(e.target.value)}
                      placeholder="Update task name"
                    />
                    <textarea
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      placeholder="Update description"
                    />
                    <input
                      type="number"
                      value={updatedDuration}
                      onChange={(e) => setUpdatedDuration(e.target.value)}
                      placeholder="Update duration"
                    />
                    <button
                      className="green"
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="red"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Complete Tasks Section */}
      <div className="task-section" style={{ background: "#EEFFEE" }}>
        <h3 style={{ textAlign: "center" }}>Done Tasks</h3>
        <ul className="task-list">
          {tasks
            .filter((task) => task.status)
            .map((task) => (
              <li className="task-item" key={task.id}>
                <strong>{task.taskName}</strong>
                <p>{task.description}</p>
                <p>Duration: {task.duration} hours</p>
                <button
                  className="green"
                  onClick={() => {
                    setEditingTask(task.id);
                    setUpdatedTaskName(task.taskName);
                    setUpdatedDescription(task.description);
                    setUpdatedDuration(task.duration);
                  }}
                >
                  Edit
                </button>
                <button
                  className="red"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
                {editingTask === task.id && (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={updatedTaskName}
                      onChange={(e) => setUpdatedTaskName(e.target.value)}
                      placeholder="Update task name"
                    />
                    <textarea
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      placeholder="Update description"
                    />
                    <input
                      type="number"
                      value={updatedDuration}
                      onChange={(e) => setUpdatedDuration(e.target.value)}
                      placeholder="Update duration"
                    />
                    <button
                      className="green"
                      onClick={() => handleUpdateTask(task.id)}
                    >
                      Save
                    </button>
                    <button
                      className="red"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FetchTasks;
