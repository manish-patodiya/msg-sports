import express from 'express';
import { addBanner, addHouse, getSiteSettings, updateAboutInfo, updateBanners, updateGeneralInformation, updateHouses } from '../controller/site_settings.js';
import { fileUploadMiddleware } from '../constants/common.js';
const router = express.Router();

router.get("/", async (req, res) => {
    const result = await getSiteSettings();
    res.json(result);
});

router.post("/banner/add", fileUploadMiddleware("banner_image", "banners"), async (req, res) => {
    res.send(await addBanner(req.uploaded_file_name));
});

router.post("/banner/update", async (req, res) => {
    res.send(await updateBanners(req.body.banners));
})

router.post("/general_settings/update", async (req, res) => {
    res.send(await updateGeneralInformation(req.body));
})

router.post("/about/update", async (req, res) => {
    res.send(await updateAboutInfo(req.body));
})

router.post("/house/add", fileUploadMiddleware("house_image", "houses"), async (req, res) => {
    res.send(await addHouse(req.uploaded_file_name, req.body));
})

router.post("/house/update", async (req, res) => {
    res.send(await updateHouses(req.body.houses));
})

export default router;
