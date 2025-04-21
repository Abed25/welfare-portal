import express from "express";
import { Forum } from "../models/Forum.mjs";

const router = express.Router();

// ✅ GET all forum posts
router.get("/", async (req, res) => {
  try {
    const posts = await Forum.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch forum posts" });
  }
});

// ✅ GET a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving post" });
  }
});

// ✅ CREATE a new forum post
router.post("/", async (req, res) => {
  const { title, body, author, category } = req.body;

  try {
    const newPost = new Forum({ title, body, author, category });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create post", details: err.message });
  }
});

// ✅ ADD a reply to a post
router.post("/:id/reply", async (req, res) => {
  const { content, author } = req.body;

  try {
    const post = await Forum.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.replies.push({ content, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to add reply", details: err.message });
  }
});

export default router;
