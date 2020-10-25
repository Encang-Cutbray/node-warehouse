import express from 'express';
import { auth } from '../middlewares/auth.middleware'
import * as supplierController from '../controllers/supplier.controller';

const router = express.Router();

router.get('/supplier', auth, supplierController.getSupplier);
router.get('/supplier/create', auth, supplierController.createSupplier);
router.post('/supplier/post', auth, supplierController.postSupplier);
router.get('/supplier/:supplierId/review', auth, supplierController.reviewsSupplier);
router.put('/supplier/:supplierId/update', auth, supplierController.updateSupplier);

export default router;
