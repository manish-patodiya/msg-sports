import express from 'express';
import { deleteCaptain, getCaptains, makeCaptain } from '../controller/captains.js';
import { fileUploadMiddleware } from '../constants/common.js';
const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getCaptains());
})

router.post("/make_captain", async (req, res) => {
    res.json(await makeCaptain(req.body));
})

router.delete("/:cap_id", async (req, res) => {
    res.json(await deleteCaptain(req.params.cap_id));
})

export default router;