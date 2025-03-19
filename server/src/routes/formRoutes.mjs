import { Router } from "express";
import { FormData } from "../models/FormData.mjs"; // Ensure correct model import

const router = Router();

// Submit form
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

// Get all submissions
router.get("/api/submit-form", async (req, res) => {
  try {
    const formData = await FormData.find({}, "name email message responses");
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form data" });
  }
});

// Respond to student
router.post("/api/respond", async (req, res) => {
  try {
    const { studentId, response } = req.body;

    // Find the request by ID and push response to the array
    const updatedRequest = await FormData.findByIdAndUpdate(
      studentId,
      { $push: { responses: response } }, // Push response into the array
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Response added successfully", updatedRequest });
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json({ message: "Failed to save response" });
  }
});

export default router;
