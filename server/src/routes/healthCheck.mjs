import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welfare backend");
});

export default router;
