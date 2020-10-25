import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import * as dashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/', auth, dashboardController.getSample);
export default router;
