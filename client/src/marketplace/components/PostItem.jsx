import React, { useState } from "react";
import axios from "axios";
import "../styles/postitem.css";

const PostItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    posted_by: 1, // Hardcoded student ID
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://localhost:5000/api/listings", data);
      alert("Item posted!");
    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poster">
      <h2 style={{ textAlign: "center" }}>Post Item</h2>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Post Item</button>
    </form>
  );
};

export default PostItem;
