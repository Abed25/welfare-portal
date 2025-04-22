import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Forum.css";

const Forum = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/forum");
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        console.warn("Unexpected response:", res.data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts", err);
      setError("Could not load forum posts.");
    }
  };

  const handleNewPost = () => {
    navigate("new");
  };

  const handleViewPost = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="forum-container">
      <h2>Forum Discussions</h2>
      <button className="create-post-btn" onClick={handleNewPost}>
        Start New Discussion
      </button>

      <div className="forum-posts">
        {error && <p style={{ color: "red" }}>{error}</p>}

        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="forum-post-preview">
              <h3>{post.title}</h3>
              <p>{post.body?.slice(0, 100)}...</p>
              <button
                className="view-post-btn"
                onClick={() => handleViewPost(post._id)}
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
