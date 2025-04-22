import React from "react";
import { Routes, Route } from "react-router-dom";
import Forum from "../component/Forum";
import NewPostForm from "../component/NewPostForm";
import ForumPost from "../component/ForumPost";

export default function Forum_Layout() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* Nested forum routes */}
      <Routes>
        <Route path="/" element={<Forum />} />
        <Route path="new" element={<NewPostForm />} />
        <Route path=":id" element={<ForumPost />} />
      </Routes>
    </div>
  );
}
