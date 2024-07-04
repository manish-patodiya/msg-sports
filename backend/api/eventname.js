import express from "express";
import { getEventname } from "../controller/eventname.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getEventname();
  res.json(response); 
});

export default router;
