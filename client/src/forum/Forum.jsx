// Forum.jsx
import React from "react";
import "./Forum.css";

const Forum = () => {
  return (
    <div className="forum-container">
      <h2>Forum Discussions</h2>
      <button className="create-post-btn">Start New Discussion</button>
      <div className="forum-posts">
        <div className="forum-post-preview">
          <h3>Sample Topic</h3>
          <p>This is a short preview of the discussion...</p>
          <button className="view-post-btn">View</button>
        </div>
        {/* More post previews */}
      </div>
    </div>
  );
};

export default Forum;
