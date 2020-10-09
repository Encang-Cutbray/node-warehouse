import express from 'express';
import * as errorController from '../controllers/error.controller';

const router = express.Router();
router.get('/403', errorController.handle403);
router.get('/404', errorController.handle404);
router.get('/500', errorController.handle500);
export default router;
