import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import { isAuthorize } from '../middlewares/authorize.middleware'

import * as warehouseController from '../controllers/warehouse.controller';

const router = express.Router();

router.get('/warehouse', auth, isAuthorize('warehouse.read'), warehouseController.getWarehouse);
router.get('/warehouse/create', auth, isAuthorize('warehouse.read', 'warehouse.create'), warehouseController.createWarehouse);
router.post('/warehouse/post', auth, isAuthorize('warehouse.read', 'warehouse.create'), warehouseController.postWarehouse);
router.get('/warehouse/:warehouseId/review', auth, isAuthorize('warehouse.read', 'warehouse.read'), warehouseController.reviewsWarehouse);
router.put('/warehouse/:warehouseId/update', auth, isAuthorize('warehouse.read', 'warehouse.update'), warehouseController.updateWarehouse);

export default router;
