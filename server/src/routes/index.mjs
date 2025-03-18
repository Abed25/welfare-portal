import { Router } from "express";
import formRouter from "./formRoutes.mjs";
import helperRouter from "./healthCheck.mjs";

const router = Router();

router.use(helperRouter);
router.use(formRouter);

export default router;
