import express from 'express';
import authRouter from './auth.js';
import siteSettingRouter from './site_settings.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/site_settings', siteSettingRouter);

export default router;