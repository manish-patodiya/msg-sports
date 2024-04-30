import express from 'express';
import { addCategory, deleteCategory, getCategories } from "../controller/categories.js"
const router = express.Router();

router.get("/", async (req, res) => {
    res.json(await getCategories());
})

router.post("/add", async (req, res) => {
    res.json(await addCategory(req.body));
})

router.delete("/", async (req, res) => {
    res.json(await deleteCategory(req.body.game_id))
})

export default router;