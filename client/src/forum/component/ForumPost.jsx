import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/Forum.css";

const ForumPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/forum/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Failed to fetch post", err);
      setError("Could not load the post.");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      await axios.post(`/api/forum/${id}/reply`, {
        content: replyContent,
        author: "Anonymous", // Replace with logged-in user if available
      });
      setReplyContent("");
      fetchPost(); // Refresh post with new reply
    } catch (err) {
      console.error("Failed to submit reply", err);
      setError("Could not submit reply.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="forum-post-container">
      <h2>{post.title}</h2>
      <p className="post-author">Posted by: {post.author || "Unknown"}</p>
      <div className="post-content">
        <p>{post.body}</p>
      </div>

      <h3>Replies</h3>
      <div className="replies">
        {post.replies && post.replies.length > 0 ? (
          post.replies.map((reply, index) => (
            <div key={index} className="reply">
              <p>
                <strong>{reply.author || "Anonymous"}:</strong> {reply.content}
              </p>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      <form className="reply-form" onSubmit={handleReply}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write a reply..."
          required
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

export default ForumPost;
