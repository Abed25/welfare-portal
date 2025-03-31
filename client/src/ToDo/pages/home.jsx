import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/home.css";

export default function ToDoHome() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="UI" style={{ height: "60vh" }}>
        <h2>Features</h2>
        <button
          onClick={() => navigate("add-tasks", { relative: "path" })}
          title="Create an activity."
        >
          Add Activities{" "}
        </button>
        <button
          onClick={() => navigate("list-of-tasks", { relative: "path" })}
          title="Take a look at your recorded activities."
        >
          View Activities{" "}
        </button>

        <button
          style={{
            background: "white",
            border: "1px gray solid",
            color: "black",
          }}
          title="More features coming..."
          onClick={() => {
            toast.success("More features coming soon!");
            navigate("/todo");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
