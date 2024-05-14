import express from 'express';
import { changePassword, newUserLogin, validateLoginData } from '../controller/auth.js';
import jwt from 'jsonwebtoken';
import { ADMIN_ROLE_ID, CAPTAIN_ROLE_ID, JWT_SECRET_KEY, PLAYER_ROLE_ID } from '../constants/constants.js';

const router = express.Router();

const attachAuthToken = (result) => {
    if (result.status == 1) {
        const user_data = result.response;
        const token = jwt.sign({ "_id": user_data.user_id }, JWT_SECRET_KEY);
        delete result.response.id
        // delete result.response.user_id
        delete result.response.role_id
        result.auth = token;
    }
}

router.post("/admin/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data, ADMIN_ROLE_ID);
    attachAuthToken(result);
    res.json(result);
})

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

router.post("/updatePassword", async (req,res) => {
    const data = req.body;
    const result = await changePassword(data, PLAYER_ROLE_ID);
    res.json(result);
})

export default router;