import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  postedAt: { type: Date, default: Date.now },
});

const userListingSchema = new mongoose.Schema({
  userId: String,
  name: {
    type: String,
    required: true,
  },
  registeredEmail: {
    type: String,
    required: true,
  },
  listings: [itemSchema],
  createdAt: { type: Date, default: Date.now },
});

export const UserListing = mongoose.model("UserListing", userListingSchema);
