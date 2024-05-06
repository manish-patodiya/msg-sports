import express from "express";
import { addEvent, deleteEvent, getEvent } from "../controller/events.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getEvent());
});

router.post("/add", async (req, res) => {
  res.json(await addEvent(req.body));
});

router.delete("/", async (req, res) => {
  res.json(await deleteEvent(req.body.game_id));
});

export default router;
