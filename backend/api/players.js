import express from 'express';
import { deletePlayer, getPlayer, getPlayers, updateStatus } from '../controller/players.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getPlayers();
    res.json(result);
})

router.get("/get_player", async (req, res) => {
    const result = await getPlayer(req.query.id)
    res.json(result);
})

router.post("/update_player_status/:id/:status_code", async (req, res) => {
    res.json(await updateStatus(req.params.id, req.params.status_code))
})

router.post("/delete", async (req, res) => {
    const result = await deletePlayer(req.query.id);
})

export default router;
