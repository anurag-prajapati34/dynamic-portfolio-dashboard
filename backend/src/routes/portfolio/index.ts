import { Router } from "express";
import { getHoldingsHandler } from "./handler.js";

const router = Router();

router.get("/holdings", getHoldingsHandler);

export default router;
