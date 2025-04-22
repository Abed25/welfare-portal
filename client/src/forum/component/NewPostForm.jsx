// NewPostForm.jsx
import React from "react";
import "../style/Forum.css";
import { useAuth } from "../../context/AuthProvider";

const NewPostForm = () => {
  const { user } = useAuth();

  return (
    <form className="new-post-form">
      <h2>Start New Discussion</h2>
      {/* 
      title, body, author and categoy
      */}
      <input type="text" placeholder="Title" required />
      <textarea placeholder="Write your post here..." required></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
