import express from 'express';
import { check } from 'express-validator'

import {isAuth} from '../middlewares/auth.middleware'
import * as dashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/', isAuth, dashboardController.getDashbord);
export default router;
