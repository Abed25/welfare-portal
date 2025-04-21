import { Router } from "express";
import formRouter from "./formRoutes.mjs";
import helperRouter from "./healthCheck.mjs";
import marketplaceRouter from "./marketplaceRoutes.mjs";
import imageRouter from "./imageRoutes.mjs";
import forumRoutes from "./ForumRoutes.mjs";

const router = Router();

router.use(helperRouter);
router.use(formRouter);
router.use(marketplaceRouter);
router.use(imageRouter);

router.use("/api/forum", forumRoutes);

export default router;
