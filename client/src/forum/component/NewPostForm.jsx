import React, { useState } from "react";
import "../style/Forum.css";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_BASE_URL;

const NewPostForm = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General"); // Default category
  const [otherCategory, setOtherCategory] = useState(""); // For "Other" category option

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      body,
      category: category === "Other" ? otherCategory : category, // Use the custom category if "Other" is selected
      author: user.username, // Assuming 'username' is part of the user object
    };

    try {
      const response = await fetch(`${api}/forum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast.success("Post submitted successfully!");
        // Clear input fields after success
        setTitle("");
        setBody("");
        setCategory("General");
        setOtherCategory(""); // Clear custom category input if used
      } else {
        toast.error("Error submitting post. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <h2>Start New Discussion</h2>
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Body Textarea */}
      <textarea
        placeholder="Write your post here..."
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {/* Category Selector */}
      <label htmlFor="category" style={{ fontSize: "20px" }}>
        Topic's Category
      </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Education">Education</option>
        <option value="Other">Other</option>
      </select>

      {/* Input for custom category if "Other" is selected */}
      {category === "Other" && (
        <input
          type="text"
          placeholder="Specify other category"
          value={otherCategory}
          onChange={(e) => setOtherCategory(e.target.value)}
        />
      )}

      <button type="submit">Post</button>
    </form>
  );
};

export default NewPostForm;
