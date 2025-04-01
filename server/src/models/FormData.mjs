import mongoose from "mongoose";

const { Schema, model } = mongoose; // ✅ Extract Schema and model

const formSchema = new Schema({
  userName: String,
  registeredEmail: String,
  messages: { type: [String], default: [] }, // Store messages as an array
  responses: { type: [String], default: [] }, // Store responses as an array
});

export const FormData = model("FormData", formSchema); // ✅ Export correctly
