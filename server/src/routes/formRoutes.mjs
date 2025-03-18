import { Router } from "express";
import { FormData } from "../models/FormData.mjs";

const router = Router();

router.post("/api/submit-form", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

export default router;
