import mongoose from "mongoose";

const SingleImageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const UserImageSchema = new mongoose.Schema(
  {
    userName: String,
    registeredEmail: String,
    images: [SingleImageSchema],
  },
  { timestamps: true }
);

export const UserImage = mongoose.model("UserImage", UserImageSchema);
