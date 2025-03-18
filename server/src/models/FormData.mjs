import mongoose from "mongoose";

const { Schema, model } = mongoose; // ✅ Extract Schema and model

const formSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

export const FormData = model("FormData", formSchema); // ✅ Export correctly
