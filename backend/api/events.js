import express from "express";
import { addEvent, deleteEvent, getEvents } from "../controller/events.js";
import { fileUploadMiddleware } from "../constants/common.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getEvents());
});

router.post("/add", fileUploadMiddleware("event_image", "events"), async (req, res) => {
  res.json(await addEvent(req.body, req.uploaded_file_name));
});

router.delete("/:game_id", async (req, res) => {
  res.json(await deleteEvent(req.params.game_id));
});

export default router;
