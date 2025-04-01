import mongoose from "mongoose";

const { Schema, model } = mongoose; // ✅ Extract Schema and model

const formSchema = new Schema({
  userName: String,
  registeredEmail: String,
  message: String,
  responses: { type: [String], default: [] }, // Array of responses
});

export const FormData = model("FormData", formSchema); // ✅ Export correctly
