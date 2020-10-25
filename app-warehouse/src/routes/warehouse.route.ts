import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import * as warehouseController from '../controllers/warehouse.controller';

const router = express.Router();

router.get('/warehouse', auth, warehouseController.getWarehouse);
router.get('/warehouse/create', auth, warehouseController.createWarehouse);
router.post('/warehouse/post', auth, warehouseController.postWarehouse);
router.get('/warehouse/:warehouseId/review', auth, warehouseController.reviewsWarehouse);
router.put('/warehouse/:warehouseId/update', auth, warehouseController.updateWarehouse);

export default router;
