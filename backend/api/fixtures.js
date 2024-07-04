import express from "express";
import { getFixtures } from "../controller/fixtures.js";
const router = express.Router();

router.get("/:event_id", async (req, res) => {
  res.json(await getFixtures(req.params.event_id));
});

export default router;
