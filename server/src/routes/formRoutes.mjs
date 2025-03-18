import { Router } from "express";
import { FormData } from "../models/FormData.mjs"; // Remove `{}` around FormData

const router = Router();

router.post("/api/submit-form", async (req, res) => {
  try {
    const { email, message } = req.body;

    // Check if the same email has submitted the same message
    const existingEntry = await FormData.findOne({ email, message });

    if (existingEntry) {
      return res
        .status(400)
        .json({ error: "You have already submitted this message!" });
    }

    // Save only if it's a new entry
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

router.get("/api/submit-form", async (req, res) => {
  try {
    const formData = await FormData.find(); // Fetch all documents
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form data" });
  }
});

export default router;
