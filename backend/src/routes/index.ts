import { Router } from "express";
import portfolio from "./portfolio/index.js";
const router = Router();

router.use("/portfolio", portfolio);

export default router;
