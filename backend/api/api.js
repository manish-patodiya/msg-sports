import express from 'express';
import authRouter from './auth.js';
import siteSettingRouter from './site_settings.js';
import gamesRouter from './games.js';
import categoriesRouter from './categories.js';
import playersRouter from './players.js';
import housesRouter from './houses.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/site_settings', siteSettingRouter);
router.use('/games', gamesRouter);
router.use('/categories', categoriesRouter);
router.use('/players', playersRouter);
router.use('/houses', housesRouter);

export default router;