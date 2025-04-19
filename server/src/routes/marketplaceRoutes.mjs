import { Router } from "express";
import { UserListing } from "../models/MarketPlace.mjs";
import multer from "multer";

// Set up the router
const router = Router();

// Use memory storage — no disk storage
const upload = multer({ storage: multer.memoryStorage() });

// POST a new listing (stores image in MongoDB as binary)
router.post("/api/listings", upload.single("image"), async (req, res) => {
  const { title, description, price, category, userId, registeredEmail, name } =
    req.body;

  // Prepare the new item object
  const newItem = {
    title,
    description,
    price,
    category,
    image: req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : null,
  };

  try {
    // Find the user document by userId
    let userDoc = await UserListing.findOne({ userId });

    // If the user doesn't exist, create a new UserListing
    if (!userDoc) {
      userDoc = new UserListing({
        userId,
        registeredEmail,
        name, // Ensure the user's name is included
        listings: [newItem],
      });
    } else {
      // If the user already exists, push the new listing to their existing listings
      userDoc.listings.push(newItem);
    }

    // Save the user document to the database
    await userDoc.save();
    res.json({ message: "Item posted successfully", docId: userDoc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all listings (excluding image data to reduce payload)
router.get("/api/listings", async (req, res) => {
  try {
    const allDocs = await UserListing.find();

    const allItems = allDocs.flatMap((doc) =>
      doc.listings.map((item) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        postedAt: item.postedAt,
        hasImage: !!item.image?.data,
        posted_by: doc.name || "Anonymous", // ✅ now included
        email: doc.registeredEmail, // ✅ now included
      }))
    );

    res.json(allItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve individual image for a given listing
router.get("/api/listings/image/:listingId", async (req, res) => {
  const { listingId } = req.params;

  try {
    // Find the user document that contains the listing
    const userDoc = await UserListing.findOne({ "listings._id": listingId });

    // If the user document is not found, return a 404
    if (!userDoc) return res.status(404).send("Listing not found");

    // Retrieve the specific listing
    const listing = userDoc.listings.id(listingId);

    // If the listing doesn't have an image, return a 404
    if (!listing?.image?.data) return res.status(404).send("Image not found");

    // Set the content type of the response based on the image type
    res.set("Content-Type", listing.image.contentType);

    // Send the image data as a response
    res.send(listing.image.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
