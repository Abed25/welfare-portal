import mongoose from "mongoose";

const { Schema, model } = mongoose;

const listingSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  posted_by: mongoose.Schema.Types.ObjectId, // Just an ID ref
  createdAt: { type: Date, default: Date.now },
});

export const Listing = model("Listing", listingSchema);
