import express from 'express';
import { router as apiRouter } from './api.js';
import { router as healthRouter } from './health.js';

export const router = express.Router();

router.use('/api', apiRouter);
router.use('/', healthRouter);