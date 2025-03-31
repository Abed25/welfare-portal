import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../context/AuthProvider";

const FetchTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const tasksData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((task) => task.userId === user.uid);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div>
      <h2>Undone Tasks</h2>
      <ul>
        {tasks
          .filter((task) => !task.status)
          .map((task) => (
            <li key={task.id}>{task.taskName}</li>
          ))}
      </ul>
      <h2>Done Tasks</h2>
      <ul>
        {tasks
          .filter((task) => task.status)
          .map((task) => (
            <li key={task.id}>{task.taskName}</li>
          ))}
      </ul>
    </div>
  );
};

export default FetchTasks;
