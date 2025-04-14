// NewPostForm.jsx
import React from "react";
import "./Forum.css";

const NewPostForm = () => {
  return (
    <form className="new-post-form">
      <h2>Start New Discussion</h2>
      <input type="text" placeholder="Title" required />
      <textarea placeholder="Write your post here..." required></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
