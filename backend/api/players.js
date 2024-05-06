import express from 'express';
import { deletePlayer, getEligiblePlayersForCaptancy, getPlayer, getPlayers, updateStatus, promoteAsCaptain } from '../controller/players.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getPlayers();
    res.json(result);
})

router.get("/get_player", async (req, res) => {
    const result = await getPlayer(req.query.id)
    res.json(result);
})

router.get("/eligible_for_captain", async (req, res) => {
    res.json(await getEligiblePlayersForCaptancy())
})

router.get("/promote_as_captain/:house_id/:user_id", async (req, res) => {
    res.json(await promoteAsCaptain(req.params.house_id, req.params.user_id));
})

router.post("/update_player_status/:id/:status_code", async (req, res) => {
    res.json(await updateStatus(req.params.id, req.params.status_code))
})

router.post("/delete", async (req, res) => {
    const result = await deletePlayer(req.query.id);
})

export default router;
