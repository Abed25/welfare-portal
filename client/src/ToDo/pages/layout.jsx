import React from "react";
import ToDoHome from "./home";
import { Outlet } from "react-router-dom";
import TaskForm from "./TaskForm";
import FetchTasks from "./Output";

export default function ToDOLayout() {
  return (
    <div>
      <Outlet />
      <ToDoHome />
    </div>
  );
}
