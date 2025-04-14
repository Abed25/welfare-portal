// ForumPost.jsx
import React from "react";
import "./Forum.css";

const ForumPost = () => {
  return (
    <div className="forum-post-container">
      <h2>Discussion Title</h2>
      <p className="post-author">Posted by: User Name</p>
      <div className="post-content">
        <p>This is the full content of the discussion.</p>
      </div>

      <h3>Replies</h3>
      <div className="replies">
        <div className="reply">
          <p>
            <strong>User1:</strong> This is a reply.
          </p>
        </div>
        {/* More replies */}
      </div>

      <ReplyForm />
    </div>
  );
};

const ReplyForm = () => {
  return (
    <form className="reply-form">
      <textarea placeholder="Write a reply..." required></textarea>
      <button type="submit">Reply</button>
    </form>
  );
};

export default ForumPost;
