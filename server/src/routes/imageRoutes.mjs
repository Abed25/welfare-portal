import express from "express";
import multer from "multer";
import { UserImage } from "../models/Image.mjs";

const router = express.Router();

// Multer setup (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route - attach userName and registeredEmail manually
router.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, userName, registeredEmail } = req.body;

    const newImage = {
      name,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    let userImageDoc = await UserImage.findOne({ registeredEmail });

    if (userImageDoc) {
      // Append image
      userImageDoc.images.push(newImage);
      await userImageDoc.save();
    } else {
      // Create new user image record
      userImageDoc = new UserImage({
        userName,
        registeredEmail,
        images: [newImage],
      });
      await userImageDoc.save();
    }

    res.status(200).send("Image uploaded successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});

// Get route — returns latest image if name not specified
router.get("/api/image/:name?", async (req, res) => {
  try {
    const { name } = req.params;
    const { registeredEmail } = req.query;

    let userDoc, image;

    if (registeredEmail) {
      userDoc = await UserImage.findOne({ registeredEmail });
    } else {
      // Get any user document, sorted by latest update
      userDoc = await UserImage.findOne().sort({ updatedAt: -1 });
    }

    if (!userDoc) return res.status(404).send("User not found");

    if (name) {
      image = userDoc.images.find((img) => img.name === name);
    } else {
      // Get the last image in the array (most recently added)
      image = userDoc.images[userDoc.images.length - 1];
    }

    if (!image) return res.status(404).send("Image not found");

    res.set("Content-Type", image.img.contentType);
    res.send(image.img.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Image fetch failed");
  }
});

export default router;
