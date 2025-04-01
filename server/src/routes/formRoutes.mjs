import { Router } from "express";
import { FormData } from "../models/FormData.mjs"; // Ensure correct model import

const router = Router();

// Submit form (store messages as an array)
router.post("/api/submit-form", async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body); // Debugging

    const { userName, message, registeredEmail } = req.body;
    if (!registeredEmail || !message) {
      return res
        .status(400)
        .json({ error: "Missing registeredEmail or message in request!" });
    }

    // Find an existing entry by registeredEmail
    const existingEntry = await FormData.findOne({ registeredEmail });

    if (existingEntry) {
      // Push new message to messages array
      await FormData.updateOne(
        { registeredEmail },
        { $push: { messages: message } }
      );
      return res
        .status(200)
        .json({ message: "Message added to existing user!" });
    }

    // Create new entry if user doesn't exist
    const formData = new FormData({
      userName,
      registeredEmail,
      messages: [message], // Store message as an array
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
      "userName registeredEmail messages responses" // Update `message` to `messages`
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
