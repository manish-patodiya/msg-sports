import express from 'express';
import { deletePlayer, getEligiblePlayersForCaptancy, getPlayer, getPlayers, updateStatus, promoteAsCaptain, updateProfilePhoto, updatePlayerInfo } from '../controller/players.js';
import { fileUploadMiddleware } from '../constants/common.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getPlayers();
    res.json(result);
})

router.get("/get_player/:id", async (req, res) => {
    const result = await getPlayer(req.params.id)
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

router.post("/update_profile_photo/:user_id", fileUploadMiddleware("profile_photo", "profile_photo"), async (req, res) => {
    res.json(await updateProfilePhoto(req.params.user_id, req.uploaded_file_name));
})

router.post("/update_player_info/:user_id", async (req, res) => {
    res.json(await updatePlayerInfo(req.params.user_id, req.body));
})

router.post("/delete", async (req, res) => {
    const result = await deletePlayer(req.query.id);
})

export default router;
