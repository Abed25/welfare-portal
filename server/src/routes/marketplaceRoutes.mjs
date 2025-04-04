import { Router } from "express";
import { Listing } from "../models/MarketPlace.mjs";
import multer from "multer";

const router = Router();

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST a new listing
router.post("/api/listings", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, category, posted_by } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const listing = new Listing({
      title,
      description,
      price,
      category,
      image,
      posted_by,
    });

    await listing.save();
    res.json({ message: "Listing posted", id: listing._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all listings
router.get("/api/listings", async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
    //res.send("i dont see me -- the route is not found");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
