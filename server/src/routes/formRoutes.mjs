import { Router } from "express";
import { FormData } from "../models/FormData.mjs"; // Ensure correct model import

const router = Router();

// Submit form
router.post("/api/submit-form", async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // Debugging

    const { userName, message, registeredEmail } = req.body;
    if (!registeredEmail) {
      return res
        .status(400)
        .json({ error: "Missing registeredEmail in request!" });
    }

    const existingEntry = await FormData.findOne({ registeredEmail, message });
    if (existingEntry) {
      return res
        .status(400)
        .json({ error: "You have already submitted this message!" });
    }

    const formData = new FormData({
      userName,
      registeredEmail,
      message,
    });

    await formData.save();

    console.log("✅ Data saved:", formData); // Debugging
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    res.status(500).json({ error: "Error saving form data" });
  }
});

// Get all submissions
router.get("/api/submit-form", async (req, res) => {
  try {
    const formData = await FormData.find(
      {},
      "userName registeredEmail message responses"
    );
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
