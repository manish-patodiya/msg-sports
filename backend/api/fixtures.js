import express from "express";
import { getNameTeamid1, getNameTeamid2, getNameWinner } from "../controller/fixtures.js";

const router = express.Router();

router.get("/:event_id/team1", async (req, res) => {
  res.json(await getNameTeamid1(req.params.event_id));
});

router.get("/:event_id/team2", async (req, res) => {
  res.json(await getNameTeamid2(req.params.event_id));
});

router.get("/:event_id/winner", async (req, res) => {
  res.json(await getNameWinner(req.params.event_id));
});

export default router;
