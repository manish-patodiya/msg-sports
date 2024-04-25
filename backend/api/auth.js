import express from 'express';
import { newUserLogin, validateLoginData } from '../controller/auth.js';
import jwt from 'jsonwebtoken';
import { ADMIN_ROLE_ID, CAPTAIN_ROLE_ID, PLAYER_ROLE_ID } from '../constants/constants.js';

const router = express.Router();

router.post("/admin/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data, ADMIN_ROLE_ID);
    attachAuthToken(result);
    res.json(result);
})

const attachAuthToken = (result) => {
    if (result.status == 1) {
        const user_data = result.response;
        const token = jwt.sign({ "_id": user_data.id }, "jwttoken");
        delete result.response.id
        result.auth = token;
    }
}

router.post("/captain/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data, CAPTAIN_ROLE_ID);
    attachAuthToken(result);
    res.json(result);
})

router.post("/player/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data, PLAYER_ROLE_ID);
    attachAuthToken(result);
    res.json(result);
})

router.post("/new-login", async (req, res) => {
    const data = req.body;
    const result = await newUserLogin(data);
    res.json(result);
})

export default router;