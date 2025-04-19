import { Router } from "express";
import formRouter from "./formRoutes.mjs";
import helperRouter from "./healthCheck.mjs";
import marketplaceRouter from "./marketplaceRoutes.mjs";
import imageRouter from "./imageRoutes.mjs";

const router = Router();

router.use(helperRouter);
router.use(formRouter);
router.use(marketplaceRouter);
router.use(imageRouter);

export default router;
