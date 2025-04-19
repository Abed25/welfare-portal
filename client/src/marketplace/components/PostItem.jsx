import React, { useState } from "react";
import axios from "axios";
import "../styles/postitem.css";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_BASE_URL;

const PostItem = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.warn("User not authenticated");
      return;
    }

    const data = new FormData();

    // ✅ Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== "image") {
        data.append(key, value);
      }
    });

    // ✅ Append image if present
    if (formData.image) {
      data.append("image", formData.image);
      data.append("imageName", formData.image.name); // optional: for tracking filename
    }

    // ✅ Explicitly append user info like in ImageUploader
    data.append("userId", user.uid);
    data.append("name", user.username);
    data.append("registeredEmail", user.email);

    try {
      await axios.post(`${api}/listings`, data);
      toast.success("Item posted!");
    } catch (err) {
      console.error("Failed to post item", err);
      toast.error("Failed to post");
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
      <input
        name="category"
        placeholder="Category"
        onChange={handleChange}
        required
      />
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
