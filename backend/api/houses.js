import express from 'express';
import { addHouse, deleteHouse, getHouses } from '../controller/houses.js';
import { fileUploadMiddleware } from '../constants/common.js';
const router = express.Router();

router.get("/", async (req, res) => {
    res.send(await getHouses());
})

router.post("/add", fileUploadMiddleware("house_image", "houses"), async (req, res) => {
    res.send(await addHouse(req.uploaded_file_name, req.body));
})

router.delete("/:id", async (req, res) => {
    res.send(await deleteHouse(req.params.id));
})

export default router;