import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider"; // Assumes AuthProvider provides `user`
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API_BASE_URL;

function ImageUploader() {
  const { user } = useAuth(); // should contain `email` and `username`
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [view, setView] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // local preview before upload
  };

  const handleUpload = async () => {
    if (!image) return toast.warn("Select an image first!");
    if (!user) return toast.error("User not authenticated");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", image.name);
    formData.append("userName", user.username);
    formData.append("registeredEmail", user.email);

    try {
      await axios.post(`${api}/upload`, formData);
      toast.success("Image uploaded successfully!");
      fetchImage(); // fetch and show latest
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    }
  };

  const fetchImage = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`${api}/image`, {
        params: { registeredEmail: user.email },
        responseType: "blob", // important: treat image as binary
      });

      const url = URL.createObjectURL(res.data);
      setPreview(url);
    } catch (err) {
      console.error("Failed to load image from backend", err);
    }
  };

  useEffect(() => {
    fetchImage(); // get user's latest image on load
  }, [user]);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        className="ImageContainer"
        onClick={() => {
          setView(!view);
        }}
      >
        {preview && <img src={preview} alt="Preview" />}
      </div>
      {view && (
        <div
          style={{
            background: "#4a91e24f",
            marginBottom: "10px",
            borderRadius: "4px",
            padding: "2px",
            border: "#4a90e2 1px solid",
          }}
        >
          <input type="file" accept="image/*" onChange={handleChange} />
          <br />
          <button onClick={handleUpload}>Upload Image</button>
          <br />
        </div>
      )}
    </>
  );
}

export default ImageUploader;
