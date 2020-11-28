import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import { isAuthorize } from '../middlewares/authorize.middleware'

import * as warehouseController from '../controllers/warehouse.controller';

const router = express.Router();

router.get('/warehouse', auth, isAuthorize('warehouse.read', 'warehouse.create'), warehouseController.getWarehouse);
router.get('/warehouse/create', auth, warehouseController.createWarehouse);
router.post('/warehouse/post', auth, warehouseController.postWarehouse);
router.get('/warehouse/:warehouseId/review', auth, warehouseController.reviewsWarehouse);
router.put('/warehouse/:warehouseId/update', auth, warehouseController.updateWarehouse);

export default router;
