import express from 'express';
import { newUserLogin, validateLoginData } from '../controller/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/new-login", async (req, res) => {
    const data = req.body;
    const result = await newUserLogin(data);
    res.json(result);
})

router.post("/login", async (req, res) => {
    const data = req.body;
    const result = await validateLoginData(data);
    if (result.status == 1) {
        const user_data = result.response;
        const token = jwt.sign({ "_id": user_data.id }, "jwttoken");
        delete result.response.id
        result.auth = token;
        // res.cookie("auth_token", token, {
        //     httpOnly: true,
        //     maxAge: 60000
        // });
    }
    res.json(result);
})

export default router;