import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  createdAt: { type: Date, default: Date.now },
});

const forumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  category: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

export const Forum = mongoose.model("Forum", forumSchema);
