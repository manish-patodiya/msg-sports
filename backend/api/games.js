import express from 'express';
import { addGame, deleteGame, getGames } from "../controller/games.js"
const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getGames());
})

router.post("/add", async (req, res) => {
    res.json(await addGame(req.body));
})

router.delete("/", async (req, res) => {
    res.json(await deleteGame(req.body.game_id))
})

export default router;