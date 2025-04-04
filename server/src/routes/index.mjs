import { Router } from "express";
import formRouter from "./formRoutes.mjs";
import helperRouter from "./healthCheck.mjs";
import marketplaceRouter from "./marketplaceRoutes.mjs";

const router = Router();

router.use(helperRouter);
router.use(formRouter);
router.use(marketplaceRouter);

export default router;
