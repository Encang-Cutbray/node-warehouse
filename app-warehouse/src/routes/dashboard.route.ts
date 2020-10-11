import express from 'express';
import { check } from 'express-validator'
import * as dashboardController from '../controllers/dashboard.controller';
const router = express.Router();

router.get('/', dashboardController.getDashbord);
export default router;
