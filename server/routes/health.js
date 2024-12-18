import express from 'express';
import { healthCheck, getApiInfo } from '../controllers/healthController.js';

export const router = express.Router();

router.get('/healthz', healthCheck);
router.get('/', getApiInfo);