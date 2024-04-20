import express from 'express';
import { newUserLogin, validateLoginData } from '../controller/auth.js';

const router = express.Router();

router.post("/new-login", async (req, res) => {
    const data = req.body;
    const result = await newUserLogin(data);
    res.json(result);
})

router.post("/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data);
    res.json(result);
})

export default router;