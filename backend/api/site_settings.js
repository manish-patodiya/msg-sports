import express from 'express';
import { addBanner, getSiteSettings, updateAboutInfo, updateBanners, updateGeneralInformation } from '../controller/site_settings.js';
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

export default router;
