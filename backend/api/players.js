import express from 'express';
import { deletePlayer, getEligiblePlayersForCaptancy, getPlayer, getPlayers, updateStatus, updateProfilePhoto, updatePlayerInfo, assignHouse } from '../controller/players.js';
import { fileUploadMiddleware } from '../constants/common.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getPlayers(req.query, false);
    res.json(result);
})

router.get("/get_player/:id", async (req, res) => {
    const result = await getPlayer(req.params.id)
    res.json(result);
})

router.get("/eligible_for_captain", async (req, res) => {
    res.json(await getEligiblePlayersForCaptancy())
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
    res.json(await deletePlayer(req.query.id));
})

router.post("/assign_house/:user_id", async (req, res) => {
    res.json(await assignHouse(req.params.user_id, req.body.house_id, req.body.bid_amt));
})

export default router;
